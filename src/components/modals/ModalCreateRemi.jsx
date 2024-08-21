import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Button, Dialog } from "react-native-elements"
import { IoTriangle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";


const ModalCreateRemi = ({ toggleDialog }) => {
    return (
        <Dialog
            onBackdropPress={toggleDialog}
            overlayStyle={styles.overlay}
        >
            <View style={styles.containerTitle}>
                <TextInput style={styles.inputTitle} placeholder="Nombre de la sala" />
            </View>
            <View style={styles.containerQuestion}>

                <TextInput style={styles.questionTitle} placeholder="Ingresa tu pregunta" />
                <View style={{ width: '100%', height: 300 }}>
                    <View style={{ flexDirection: 'row', width: '99%', height: '40%' }}>
                        <View style={styles.containerRes}>

                            <View style={styles.containerIcon}>
                                <IoTriangle size={30} fill="#c00" />

                            </View>
                            <TextInput  style={styles.inputRes} placeholder="Ingresa una respuesta" placeholderTextColor={'#ccc'} />
                        </View>
                        <View style={styles.containerRes}>

                            <View style={styles.containerIcon}>
                                <FaCircle size={30} fill="#f0f" />

                            </View>
                            <TextInput style={styles.inputRes}  placeholder="Ingresa una respuesta" placeholderTextColor={'#ccc'}/>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '99%', height: '40%' }}>
                        <View style={styles.containerRes} >

                            <View style={styles.containerIcon}>
                                <FaDiamond size={30} fill="#00c" />

                            </View>
                            <TextInput style={styles.inputRes}  placeholder="Ingresa una respuesta" placeholderTextColor={'#ccc'}/>
                        </View>
                        <View style={styles.containerRes}>

                            <View style={styles.containerIcon}>
                                <FaSquare size={30} fill="#0c0" />

                            </View>
                            <TextInput  style={styles.inputRes}  placeholder="Ingresa una respuesta" placeholderTextColor={'#ccc'}/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row',  justifyContent: 'flex-end', alignItems: 'center', height: 30, width: '100%' }}>
                <Pressable style={styles.containerButton}><FcPrevious size={30} fill="#fff"/></Pressable>
                <Pressable style={styles.containerButton}><FcNext  size={30} fill="#fff"/></Pressable>
                <Pressable style={styles.containerButtonFinish}><Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}> Guardar </Text></Pressable>
            </View>
        </Dialog>
    )
}
const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,64,176, 0.9)', // Color de fondo semi-transparente
        padding: 50
    },
    containerTitle: {
        width: '35%',
        marginBottom: 20
    },
    inputTitle: {
        backgroundColor: 'rgba(30,30,30, 0.6)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#ccc',
        outlineWidth: 0,
    },
    containerQuestion: {
        alignItems: 'center',
        width: '100%'
    },
    questionTitle: {
        backgroundColor: '#ccc',
        borderWidth: 0.5,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#555',
        width: '100%',
        outlineWidth: 0,
        textAlign: 'center',
        marginBottom: 20,
    },
    containerRes: {
        flexDirection: 'row',
        width: '50%',
        height: '90%',
        padding: 10,
        backgroundColor: 'rgba(30,30,30, 0.6)',
        borderRadius: 2,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'stretch',
        alignContent: 'center',

    },
    containerIcon: {
        backgroundColor: '#ffcc33',
        width: '8%',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    inputRes:{
        outlineWidth: 0,
        color: '#ccc'
    },
    containerButton:{
        width: 50, 
        height: 50, 
        backgroundColor: '#000',
        alignItems: 'center', 
        justifyContent: 'center', 
        marginLeft: 10,
        color: '#fff' 
    },
    containerButtonFinish:{
        width: '15%', 
        height: 50, 
        backgroundColor: '#ffcc33',
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 15,
        marginLeft: 10,
    }
})

export default ModalCreateRemi