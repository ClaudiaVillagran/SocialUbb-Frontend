import { StyleSheet, Text, View } from "react-native";
import NavBarSection from "../NavBarSection";

const Section = () => {
    return (
        <View style={styles.container}>
            <NavBarSection/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 5, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        backgroundColor: '#000',
        borderWidth: 0.5,
        borderStartColor: '#555',
        borderEndColor: '#555',
    },
});

export default Section;
