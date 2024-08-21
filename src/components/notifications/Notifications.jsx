import { FlatList, StyleSheet, Text, View } from "react-native";
import Aside from "../pages/Aside";
import CardNotification from "./CardNotification";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../../features/notificationSlice";
import { Button } from "react-native-elements";

const Notifications = () => {
  const { student } = useSelector((state) => state.student);

  const { token } = student;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { notifications } = useSelector((state) => state.notification);

  console.log(notifications)

  // useEffect(() => {
  //   fetchData()
  // }, [])
  // const fetchData = async () => {
  //   try {
  //     setLoading(true)
  //     await dispatch(getAllNotifications({token}))
  //     setLoading(false)
  //   } catch (error) {

  //     console.error("Error fetching publications:", error);
  //   }
  // }
  return (
    <View style={styles.container}>
      <View style={styles.containerNotifications}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Notificaciones</Text>
        </View>

        {notifications ?
          notifications.length > 0 &&
          // notifications.map((notification) => (
          //   <CardNotification key={notification._id} notification={notification} />
          // ))
          <FlatList
            data={notifications}
            ItemSeparatorComponent={() => <Text />}
            renderItem={({ item: notification }) => (
              <CardNotification notification={notification} />
            )}

            contentContainerStyle={styles.listContent}
          >
          </FlatList>
          :
          <Button loading
            buttonStyle={{
              marginTop: 10,
              backgroundColor: 'transparent',
            }}
          />
        }
        {/* <CardNotification />

        <CardNotification />

        <CardNotification />

        <CardNotification /> */}
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
  containerNotifications: {
    flex: 5, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderStartColor: '#555',
    borderEndColor: '#555',
  },
  containerTitle: {
    height: 100,
    borderBottomColor: '#555',
    borderWidth: 0.5,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: 700,
    margin: 20,

  },
});
export default Notifications;
