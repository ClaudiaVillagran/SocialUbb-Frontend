import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import ModalPub from "./ModalPub";
import { useState } from "react";



const CreatePub = ({setNewPost}) => {
    const { student } = useSelector((state) => state.student);
    const { token } = student;

    const [openModal, setOpenModal] = useState(false);

    const openModalPub = () => {
        setOpenModal(true);
    };

    return (
        <View style={styles.containerView}>
            <View style={styles.container}>
                <Avatar size={50}
                    rounded
                    source={{ uri: `${student.image}` }}
                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }} 
                />
                <Pressable style={styles.containerDataPub} onPress={openModalPub}>
                    <TextInput style={styles.textInput}
                        placeholder="¿Qué estas pensando?"
                        placeholderTextColor="#999"
                        multiline={true}
                    />
                </Pressable>
                {openModal &&
                    <ModalPub openModal={openModal} setOpenModal={setOpenModal} setNewPost={setNewPost}/>
                }
            </View>
            {/* <View style={styles.containerButtons}>
                <Pressable>
                    <View style={styles.containerUpload}>
                        <RiUploadCloud2Line size={20} style={styles.icon} />
                        <Text style={styles.textUpload}>Subir archivo</Text>
                    </View>
                </Pressable>

                <Pressable style={styles.containerButton}>
                    <Text style={styles.text}>Publicar</Text>
                </Pressable>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderBlockColor: '#555',
        padding: 10,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',

    },
    textInput: {
        color: '#fff',
        fontSize: 20,
        outlineWidth: 0,
        width: '100%',
        justifyContent: 'center',
        verticalAlign: 'center',
        marginTop: 10,
    },
    
    icon: {
        color: "#aaa",
        marginRight: 10,
    },
    containerDataPub: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },

});
export default CreatePub;