
// import { NativeRouter, Route, Routes } from "react-router-native";
// import PrivateLayout from "../components/layout/private/PrivateLayout";
import Profile from "../components/pages/profile/Profile"
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../components/pages/Main";
import { StyleSheet, View } from "react-native";
import Notifications from "../components/notifications/Notifications";
import Messages from "../components/chat/Messages";
import Settings from "../components/Settings";
import Remi from "../components/remi/Remi";
import OneProject from "../components/layout/OneProjectPage/OneProject";

const Tab = createStackNavigator();

export const Routing = ({ socket, onlineStudents }) => {
  console.log(onlineStudents)

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Inicio" component={Main} />
        <Tab.Screen name="Perfil" component={Profile} />
        <Tab.Screen name="Notificaciones" component={Notifications} />
        <Tab.Screen name="Mensajes">
        {(props) => <Messages {...props} onlineStudents={onlineStudents} />}
        </Tab.Screen>
        <Tab.Screen name="Configuracion" component={Settings} />
        <Tab.Screen name="Remi" component={Remi} />
        <Tab.Screen name="OneProject" component={OneProject} />
      </Tab.Navigator>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    flexDirection: "row", // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000'
  },


});