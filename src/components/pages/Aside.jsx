import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import FollowItem from "../FollowItem";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { studentList } from "../../features/studentSlice";
import { Button } from "react-native-elements";


const Aside = () => {
    const { student } = useSelector((state) => state.student);
    const { token } = student


    const { studentsList, following, followers } = useSelector((state) => state.student);

    const dispatch = useDispatch();

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const allStudents = await dispatch(studentList({ token }))
    }

    // console.log(studentsList)
    // console.log(following)
    return (
        <View style={styles.container}>
            <TextInput placeholder="Buscar" style={styles.textInput} placeholderTextColor="#999" />
            <ScrollView style={styles.scrollToFollow}>
                <View style={styles.toFollow}>
                    <Text style={styles.title}>Descubrir</Text>

                    {!studentsList ? <Button loading
                        buttonStyle={{
                            marginTop: 10,
                            backgroundColor: 'transparent',
                        }}
                    /> :
                        <FlatList
                            data={studentsList}
                            ItemSeparatorComponent={() => <Text />}
                            renderItem={({ item }) => (
                                <FollowItem item={item} />
                            )}
                            contentContainerStyle={styles.listContent}
                        />
                    }
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 4, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        backgroundColor: '#000',
        alignItems: 'center',
    },
    listContent: {
        flex: 1,
        width: '100%'
    },
    textInput: {
        color: '#fff',
        paddingBlock: 10,
        fontSize: 16,
        backgroundColor: '#222428',
        borderRadius: 20,
        outlineWidth: 0,
        paddingHorizontal: 20,
        marginTop: 5,
        outlineWidth: 0,
        width: '80%'

    },
    scrollToFollow: {
        width: '90%',
    },
    toFollow: {
        backgroundColor: '#222428',
        width: '90%',
        margin: 'auto',
        marginTop: 15,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        padding: 10,
        color: '#fff',
        fontWeight: 900,
    }
});

export default Aside;
