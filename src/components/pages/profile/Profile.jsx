import { StyleSheet, Text, View } from "react-native";
import Aside from "../Aside";
import DataProfile from "./DataProfile";
import { useDispatch, useSelector } from 'react-redux'

import { setActiveStudent } from '../../../features/studentSlice';
import { useEffect } from "react";
// import { getProfile } from '../../features/studentSlice';

const Profile = () => {
  return (
    <View style={styles.container}>
        <View style={styles.containerProfile}>
          <DataProfile/>
        </View>
      <Aside />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    flexDirection: "row", // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible

  },
  containerProfile:{
    flex: 5, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderStartColor: '#555',
    borderEndColor: '#555',
  }
});
export default Profile;