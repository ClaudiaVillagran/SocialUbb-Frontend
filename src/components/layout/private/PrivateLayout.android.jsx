import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../navbar/NavBar";
import Main from "../../pages/Main";

 const PrivateLayout = () => {
  return (
    <View style={styles.container}>
        <NavBar/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    },
  });

export default PrivateLayout;