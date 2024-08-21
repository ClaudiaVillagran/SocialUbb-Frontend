import { Image, Text, View, TouchableOpacity, Linking, StyleSheet } from "react-native";


const FileOthers = ({ file, type, me }) => {
    const handleDownload = () => {
        // Abre el enlace en el navegador predeterminado
        Linking.openURL(file.secure_url);
    };
    return (
        <View style={styles.container}>

            {/*File infos*/}
            <View style={styles.containerImage}>
                <Image
                    style={styles.image}
                    source={{ uri: (`../../../../images/files/${type}.png`) }}
                    alt=""
                />
                <Text style={{color: '#777'}}>{file.original_filename}.{file.public_id.split(".")[1]}</Text>
                <Text style={{color: '#777'}}>{type} . {file.bytes}B</Text>
            </View>
            {/*Download button*/}
            {!me && (
                <TouchableOpacity onPress={handleDownload}>
                    {/* Agrega aquí tu icono de descarga */}
                    <Text style={{color: '#777'}}>Download</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 'auto',
        minHeight: 300,
    },
    containerImage: {
        width: 'auto',
        height: '100%'
    },
    image: {
        width: 'auto',
        height: '100%',
        resizeMode: 'cover',
    },
});
export default FileOthers