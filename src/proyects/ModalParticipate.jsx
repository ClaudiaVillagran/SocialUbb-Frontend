import { useState } from 'react';
import {
    Button,
    Dialog,
} from '@rneui/themed';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import React from 'react'
import { Avatar } from 'react-native-elements';
import { getConversationImage, getConversationName } from '../utils/chat';
import { capitalize } from '../utils/string';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../features/chatSlice';
import SocketContext from '../context/SocketContext';



const ModalParticipate = ({ visible1, setVisible1, student, convo, project, socket }) => {
    const [defaultValue, setDefaultValue] = useState(`Hola, ¡Quiero ser parte del proyecto "${project.title}"!.`)
    const dispatch = useDispatch();
    const { token } = student;
    const [loadingParticipate, setLoadingParticipate] = useState(false);
    // console.log(project)
    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };

    const handleSend = async () => {
        setLoadingParticipate(true);
        const values = {
            message: defaultValue,
            convo_id: convo._id,
            files: [],
            token,
        };
        let newMessage = await dispatch(sendMessage(values));

        socket.emit('newPartner', project, student);

        setTimeout(() => {
            setLoadingParticipate(false);
        }, 500);
        toggleDialog1();
    };

    return (
        <View style={{ width: '80%' }}>
            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
                overlayStyle={styles.container} // Añade esta línea
            >
                <View style={{ alignItems: 'center' }}>
                    {!student || !convo ?
                        <Button loading
                            buttonStyle={{
                                backgroundColor: 'transparent',
                            }}
                        />
                        :
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                                <Avatar size={30}
                                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                                    rounded source={{
                                        uri: (getConversationImage(student, convo.students))
                                    }}
                                />
                                <Text style={{ color: "#fff", fontSize: '20px' }}>
                                    {convo.isGroup
                                        ? convo.name
                                        :
                                        capitalize(getConversationName(student, convo.students))}
                                </Text >

                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={defaultValue}
                                />

                                {/* <Button
                            title={loadingParticipate ? 'Cargando...' : 'Participar'}
                            onPress={handleSend}
                            buttonStyle={styles.sendButton}
                        /> */}
                                <Button
                                    disabled={loadingParticipate ? true : false}
                                    title={loadingParticipate ? 'Cargando...' : 'Participar'}
                                    onPress={handleSend}
                                    containerStyle={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                    }}
                                    buttonStyle={{
                                        backgroundColor: '#ffcc33',
                                        borderRadius: 10,
                                    }}
                                    titleStyle={{
                                        color: 'white',
                                    }}
                                />
                            </View>
                        </>
                    }
                </View>
            </Dialog>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343640',
        borderRadius: 10,
        width: '60%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '80%',
    },
    input: {
        flex: 1,
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginRight: 10,
        outlineWidth: 0,
    },
});
const ModalParticipateWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ModalParticipate {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ModalParticipateWithSocket;