import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";

import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdSearch, IoMdMore } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { TbMessage2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import { RiGamepadLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge } from 'react-native-elements';
import { updateNotificationCount } from "../../features/notificationSlice";


const NavBar = ({ navigation }) => {
    const { student } = useSelector((state) => state.student);
    const { token } = student;


    const renderItem = ({ item }) => (
        <Item title={item.title} icon={item.icon} handlePublish={handlePublish} navigation={navigation} />
    );

    const handlePublish = () => {
        // Lógica para manejar la acción de publicar
        localStorage.clear();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.config}>
                {/* Componente de configuración */}
                <Avatar size={32}
                    rounded
                    source={{ uri: (student.image) }}
                    containerStyle={{ backgroundColor: '#0040b0', marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                />
                <View>
                    <Text style={[styles.text, styles.name]}>{student.name}</Text>
                    <Text style={styles.carreer}>@IECI</Text>
                </View>
                {/* <IoMdMore size={25} style={styles.icon} /> */}

            </View>
        </View>
    );
};



const DATA = [
    { id: '1', title: '', icon: 'logo' },
    { id: '2', title: 'Inicio', icon: 'home' },
    { id: '4', title: 'Notificaciones', icon: 'notifications' },
    { id: '5', title: 'Mensajes', icon: 'message' },
    { id: '6', title: 'Perfil', icon: 'profile' },
    { id: '7', title: 'Configuración', icon: 'settings' },
    { id: '9', title: '', icon: 'pub' },
    // Agrega más elementos aquí si es necesario
];

const Item = ({ title, icon, handlePublish, navigation }) => {

    const dispatch = useDispatch();
    const { countNotification } = useSelector((state) => state.notification);
    const newPublications = () => {
        dispatch(updateNotificationCount(0))
        navigation.navigate("Notificaciones")
    }

    const renderIcon = () => {
        switch (icon) {
            case 'logo':
                return <View style={styles.item}>
                    <Pressable onPress={() => navigation.navigate("Inicio")} >
                        <GiAngelOutfit size={35} style={styles.icon} />
                    </Pressable>
                </View>
            case 'home':
                return (<Pressable onPress={() => navigation.navigate("Inicio")} >
                    <View style={styles.item}>
                        <IoHomeOutline size={25} style={styles.icon} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </Pressable>);
            case 'notifications':
                return (<Pressable onPress={newPublications} >
                    <View style={styles.item}>
                        <MdOutlineNotifications size={25} style={styles.icon} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        {countNotification != 0 &&
                            <Badge value={countNotification} status="warning" containerStyle={{ position: 'absolute', top: 8, right: -15 }} />
                        }
                    </View>
                </Pressable>)
            case 'message':
                return (<Pressable onPress={() => navigation.navigate("Mensajes")} >
                    <View style={styles.item}>
                        <TbMessage2 size={25} style={styles.icon} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </Pressable>)
            case 'profile':
                return (<Pressable onPress={() => navigation.navigate("Perfil")} >
                    <View style={styles.item}>
                        <FaRegUser size={25} style={styles.icon} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </Pressable>);
            case 'settings':
                return (<Pressable onPress={() => navigation.navigate("Configuracion")} >
                    <View style={styles.item}>
                        <IoSettingsOutline size={25} style={styles.icon} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </Pressable>);
            case 'pub':
                return (
                    <Pressable onPress={handlePublish} style={styles.publishButtonContainer}>
                        <Text style={styles.publishButton}>Cerrar sesión</Text>
                    </Pressable>
                );
            default:
                return null;
        }
    };


    return (
        <>
            {renderIcon()}
        </>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        maxHeight: '100vh',
        flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    },
    listContent: {
        flexGrow: 4,
        alignItems: 'start',
        marginLeft: '20%',
    },
    config: {
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginBottom: 10,
        height: 50,
        flexDirection: 'row',
    },
    text: {
        color: "#fff", // Establecer el color del texto en blanco
    },
    item: {
        alignItems: 'center',
        height: 60,
        width: '100%',
        flexDirection: 'row',
        cursor: 'pointer',
        position: 'relative',
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 600,
    },
    icon: {
        color: "#fff",
        marginRight: 10,
    },
    publishButtonContainer: {
        backgroundColor: '#0040b0',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 50,
    },
    publishButton: {
        backgroundColor: '#0040b0',
        width: '100%',
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 50,
        color: '#fff',
        fontWeight: 900,
        fontSize: 18,
    },
    carreer: {
        color: '#666',
        fontSize: 16,
    },
    name: {
        fontWeight: 900,
        fontSize: 16,
    },
});

export default NavBar;
