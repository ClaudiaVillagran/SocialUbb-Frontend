import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View } from "react-native";
import PublicationStudentScreen from "./PublicationStudentScreen";
import ProyectStudentScreen from "./ProyectStudentScreen";

import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../features/studentSlice";
import { useEffect, useState } from "react";


const Stack = createMaterialTopTabNavigator();

const DataProfile = () => {

    const { student } = useSelector((state) => state.student);
    const { token } = student
    // console.log(student)
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { activeStudent } = useSelector((state) => state.student);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileUser = await dispatch(getProfile({ token, studentId: student._id }));
                // console.log(profileUser);
            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };
        fetchData();
    }, [token, student]);
    useEffect(() => {
        if (activeStudent) {
            setLoading(false);
        }

    }, [activeStudent]);
    // console.log(activeStudent)

    return (
        <View style={styles.container}>
            {loading && <Text>Cargando...</Text>}
            {!loading || activeStudent ? (
                <>
                    <View style={styles.ContainerInfoUser}>
                        <View style={styles.principalInfo}>
                            <View>
                                <Avatar size={60}
                                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                                    rounded source={{ uri: `${activeStudent.student.image}` }} />
                            </View>
                            {/* <Avatar size={60}
                        rounded
                        title="C"
                        containerStyle={{ backgroundColor: '#0040b0', marginRight: 10 }}
                    /> */}
                            <View style={styles.containerNameUser}>
                                <Text style={[styles.nameUser, styles.text]}>{activeStudent.student.name}</Text>
                                <Text style={[styles.carrer]}>@IECI</Text>
                            </View>
                        </View>

                        <Text style={[styles.text, styles.bio]}>{activeStudent.student.bio}</Text>
                        <View style={styles.dataFollows} >
                            <Text style={[styles.count]}>{activeStudent.follower.length}</Text>
                            <Text style={[styles.followers]}>Followers</Text>

                            <Text style={[styles.count]}>{activeStudent.following.length}</Text>
                            <Text style={[styles.followers]}>Following</Text>
                        </View>
                    </View>
                    <View style={styles.containerNav}>
                        <Stack.Navigator tabBarOptions={{
                            style: styles.tabBar,
                            labelStyle: styles.label,
                        }}>
                            {/* <Stack.Screen name="Publicaciones" >
                                {(props) => <PublicationStudentScreen {...props} activeStudent={activeStudent} />}
                            </Stack.Screen> */}
                            <Stack.Screen name="Proyectos" >
                                {(props) => <ProyectStudentScreen {...props} activeStudent={activeStudent} />}
                            </Stack.Screen>
                        </Stack.Navigator>
                    </View>
                </>
            ) :
                <Button loading
                    buttonStyle={{
                        marginTop: 10,
                        backgroundColor: 'transparent',
                    }}
                />
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        backgroundColor: '#000',
        borderWidth: 0.5,
        borderBottomColor: '#555',
        height: '100%'

    },
    principalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ContainerInfoUser: {
        margin: 10,
    },
    bio: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 10,
    },
    nameUser: {
        fontWeight: 900,
        fontSize: 26,
    },
    carrer: {
        color: '#666',
        fontSize: 20,
    },
    text: {
        color: '#fff',
    },
    dataFollows: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followers: {
        marginRight: 10,
        color: '#666',
        fontWeight: 500,
        fontSize: 16,
    },
    count: {
        marginRight: 5,
        fontWeight: 600,
        fontSize: 14,
        color: '#ffcc33'
    },
    label: {
        color: '#fff',
        fontWeight: 700,
    },
    tabBar: {
        backgroundColor: '#000',
        borderWidth: 0.5,
        borderBottomColor: '#555',
    },
    containerNav: {
        flex: 1,
        height: '100%'
    }
});
export default DataProfile;