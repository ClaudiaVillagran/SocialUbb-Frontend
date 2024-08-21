import { StyleSheet, Text, View } from "react-native";

const OneProject = ({projectId}) => {
    console.log(projectId)
    return (    
        <View style={styles.container}>
            <Text>Ver un proyecto</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        flexDirection: "row", // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible

    },
});
export default OneProject;
