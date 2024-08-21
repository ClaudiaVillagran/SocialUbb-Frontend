import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Button, Dialog } from "react-native-elements"
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";


const ModalJoinRemi = ({ toggleDialog }) => {
    return (
        <Dialog
            onBackdropPress={toggleDialog}
            overlayStyle={styles.overlay}
        >
            
        </Dialog>
    )
}
const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,64,176, 0.9)', // Color de fondo semi-transparente
        padding: 50
    },
    
})

export default ModalJoinRemi