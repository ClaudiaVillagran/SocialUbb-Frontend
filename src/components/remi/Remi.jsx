import { Pressable, StyleSheet, Text, View } from 'react-native'
import Aside from '../pages/Aside'
import { RiGamepadLine } from "react-icons/ri";

import { useState } from 'react';
import ModalCreateRemi from '../modals/ModalCreateRemi';

import ModalJoinRemi from '../modals/ModalJoinRemi';

const Remi = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const [modalJoin, setModalJoin] = useState(false);

    const toggleDialog = () => {
        setModalOpen(!modalOpen);
    };
    const toggleDialogJoin= () => {
        setModalJoin(!modalJoin);
    };
    return (
        <View style={styles.container}>

            <View style={styles.containerRemi}>
                <RiGamepadLine size={80} fill='#fff' style={styles.icon} />
                <Text style={styles.title} >Bienvenido a Reta&Mira</Text>
                <Text style={{ color: '#ccc', fontStyle: 'italic', marginBottom: 50 }}>Diviertete creando desafíos con tus propias preguntas</Text>
                <View>
                    <Pressable style={styles.buttonPrimary}
                        onPress={toggleDialog}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center' }} >Crear una sala</Text>
                    </Pressable>
                    <Pressable style={styles.buttonSecondary}  onPress={toggleDialogJoin}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Unirse a una sala</Text>
                    </Pressable>
                </View>
                {modalOpen &&
                    <ModalCreateRemi toggleDialog={toggleDialog}/>
                }
                {modalJoin &&
                    <ModalJoinRemi toggleDialog={toggleDialogJoin}/>
                }
            </View>

            <Aside />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    containerRemi: {
        flex: 5, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        backgroundColor: '#000',
        borderWidth: 0.5,
        borderStartColor: '#555',
        borderEndColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginBottom: 50
    },
    title: {
        color: '#ffcc33',
        fontSize: 50,
        fontWeight: 'bold',
        textShadowColor: '#fff', // Color amarillo para el brillo
        textShadowOffset: { width: 1, height: 1 }, // Ajusta la posición del brillo
        textShadowRadius: 3, // Ajusta la difuminación del brillo
        textAlign: 'center',
        marginBottom: 10
    },
    buttonPrimary: {
        backgroundColor: '#0040b0',
        padding: 10,
        borderRadius: 20,
        width: 200,
        marginBottom: 20
    },
    buttonSecondary: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        width: 200,
        marginBottom: 10
    },
});
export default Remi