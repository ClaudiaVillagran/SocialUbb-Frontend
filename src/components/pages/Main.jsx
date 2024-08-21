import { ScrollView, StyleSheet, Text, View } from "react-native";
import Section from "./Section";
import Aside from "./Aside";

const Main = () => {
  return (
    <View style={styles.container}>
      <Section />
      <Aside />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    flexDirection: "row", // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible

  },


});

export default Main;
