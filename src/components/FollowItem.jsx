import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar } from 'react-native-elements';
import { Global } from "../helpers/Global";
import { useDispatch, useSelector } from "react-redux";

import { letsFollow, stopFollowing } from '../features/studentSlice';
import SocketContext from "../context/SocketContext";
import { Button } from "@rneui/themed";
import { useState } from "react";

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    // containerButtonFollow: {
    //     backgroundColor: '#0040b0',
    //     padding: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 30,
    //     width: '30%'

    // },
    // containerButtonUnFollow: {
    //     backgroundColor: '#d43f3a',
    //     padding: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 30,
    //     width: '30%'

    // },
});

const FollowItem = ({ item, socket }) => {
    const { studentsList, following, followers } = useSelector((state) => state.student);
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const [loadingFollow, setLoadingFollow] = useState(false);
    const [loadingUnFollow, setLoadingUnFollow] = useState(false);

    const dispatch = useDispatch();

    const follow = (id) => {
        setLoadingFollow(true);
        dispatch(letsFollow({ token, followed: id }))

        // console.log(student, id)
        socket.emit('newFollow', student, id);
        setTimeout(() => {
            setLoadingFollow(false);
        }, 500);
    }

    const unFollow = (id) => {
        setLoadingUnFollow(true);
        dispatch(stopFollowing({ token, id }))
        setTimeout(() => {
            setLoadingUnFollow(false);
        }, 500);
    }
    return (
        <>
            {!item || !student || !studentsList ?
                <Button loading
                    buttonStyle={{
                        marginTop: 10,
                        backgroundColor: 'transparent',
                    }}
                /> :
                <>
                    {item._id != student._id &&

                        <View key={item.id} style={styles.container}>

                            <View style={{ flexDirection: 'row', width: '70%', alignItems: 'center' }}>
                                <Avatar size={32}
                                    rounded
                                    source={{ uri: (item.image) }}
                                    containerStyle={{ borderWidth: 1.5, borderColor: '#ffcc33', backgroundColor: '#0040b0', marginRight: 10, }}
                                />
                                <Text style={[styles.text, styles.name]}>{item.name}</Text>
                            </View>
                            {studentsList && !following.includes(item._id) &&
                                // <Pressable style={styles.containerButtonFollow} onPress={() => follow(item._id)}>
                                //     <Text style={[styles.text]}>Seguir</Text>
                                // </Pressable>
                                <Button
                                    disabled={loadingFollow ? true : false}
                                    title={loadingFollow ? 'Cargando...' : 'Seguir'}
                                    onPress={() => follow(item._id)}
                                    buttonStyle={{
                                        backgroundColor: '#0040b0',
                                        padding: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: '30%',
                                    }}
                                />
                            }
                            {studentsList && following.includes(item._id) &&
                                // <Pressable style={styles.containerButtonUnFollow} onPress={() => follow(item._id)}>
                                //     <Text style={[styles.text]}>No seguir</Text>
                                // </Pressable>
                                <Button
                                    disabled={loadingUnFollow ? true : false}
                                    title={loadingUnFollow ? 'Cargando...' : 'No seguir'}
                                    onPress={() => unFollow(item._id)}
                                    buttonStyle={{
                                        backgroundColor: '#d43f3a',
                                        padding: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: '30%',
                                    }}
                                />
                            }
                        </View>
                    }
                </>
            }
        </>
    )
}

const FollowItemWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <FollowItem {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default FollowItemWithSocket;