import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { loginStudent } from '../../../features/studentSlice';

const PublicLayout = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async () => {

        let res = await dispatch(loginStudent({ email, password }));

        // console.log(res);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../../assets/img/BackgroundLogin.png')} // Reemplaza 'path_to_your_image.jpg' con la ruta de tu imagen
                style={styles.background}
            >
                <View style={styles.containerLogin}>
                    <View styles={styles.containerInfoj}>
                        <Text style={styles.title}>Iniciar sesión</Text>
                        <Text style={styles.subheading}>Bienvenido a SocialUbb</Text>
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.label}>Correo institucional:</Text>
                        <TextInput style={styles.textInput}
                            placeholder='Ingresa tu correo'
                            placeholderTextColor='#ccc'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.label}>Contraseña:</Text>
                        <TextInput style={styles.textInput}
                            placeholder='Ingresa tu contraseña'
                            placeholderTextColor='#ccc'
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.containerButton}>
                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.textButton}>INGRESAR</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    containerInput: {
        width: '95%',
        alignSelf: 'center',
    },
    label: {
        color: '#fff',
    },
    containerLogin: {
        width: '40%',
        height: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 35,
        borderWidth: 1,
        marginRight: 30,
        borderColor: 'rgb(133,145, 149)',
        padding: 30,
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontWeight: 700,
        fontSize: 30,
        marginBottom: 5,
        marginLeft: 10,
    },
    subheading: {
        color: '#ccc',
        fontSize: 15,
        fontWeight: 'light',
        fontStyle: 'italic',
        marginLeft: 10,
    },
    textInput: {
        color: '#fff',
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: 'rgb(133,145, 149)',
        paddingBlock: 10,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        outlineWidth: 0,
        paddingHorizontal: 20,
        marginTop: 5,
    },
    containerInfoj: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#9a7'
    },
    containerButton: {
        alignSelf: 'center',
        width: '95%',
        height: 60,
        backgroundColor: 'rgb(175,215, 208)',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        cursor: 'pointer',
    },
    textButton: {
        fontWeight: 500,
        fontSize: 20,
    },
});

export default PublicLayout;
