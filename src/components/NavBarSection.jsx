import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  PublicationScreen  from '../publications/PublicationScreen';
import ProyectScreen from '../proyects/ProyectScreen';


const Stack = createMaterialTopTabNavigator();

const NavBarSection = () => {
  
  return (

    <View style={styles.container}>
      <Stack.Navigator tabBarOptions={{
            style: styles.tabBar,
            labelStyle: styles.label,
          }}>
        {/* <Stack.Screen  name="Publicaciones" component={PublicationScreen} /> */}
        <Stack.Screen name="Proyectos" component={ProyectScreen} />
      </Stack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderBottomColor: '#555',

  },
  text: {
    color: '#fff',
  },

  label: {
    color: '#fff',
    fontWeight: 700,
  },
  tabBar: {
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderBottomColor: '#555',
  },
});

export default NavBarSection;
