import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
// import OneProject from "../layout/OneProjectPage/oneProject";
import { dateHandler } from "../../utils/date";

const CardNotification = ({ notification }) => {

    const navigation = useNavigation();

    const seeInfo = (notification) => {
        console.log('see info', notification);
        if (notification.category !== 'NewPartner') {
                navigation.navigate('OneProject', { projectId: notification.project._id });
        } else {
            console.log('is not different')
        }
        // navigation.navigate(<OneProject projectId={projectId}/>)
    }
    return (
        <Pressable style={styles.container} onPress={() => seeInfo(notification)}>
            <View style={styles.containerDataJustify}>
                <View style={styles.containerData}>
                    <Avatar size={32}
                        rounded
                        containerStyle={{ backgroundColor: '#0040b0', marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                        source={{ uri: `${notification.fromStudent.image}` }}
                    />
                    <Text style={[styles.text, styles.titleNotification]}>{notification.fromStudent.name}</Text>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.description}>{`Hace ${dateHandler(notification.created_at)}`}</Text>
                </View>
            </View>

            {notification.category === 'NewLike' &&
                <Text style={styles.description}>{`Al estudiante ${notification.fromStudent.name} le ha gustado tu proyecto ${notification.project.title} `}</Text>
            }
            {notification.category === 'NewComment' &&
                <Text style={styles.description}>{`El estudiante ${notification.fromStudent.name} ha comentado en tu proyecto ${notification.project.title} `}</Text>
            }
            {notification.category === 'NewPartner' &&
                <Text style={styles.description}>{`El estudiante ${notification.fromStudent.name} quiere ser parte de tu proyecto ${notification.project.title}, revisa tus mensajes `}</Text>
            }
            {notification.category === 'NewFollow' &&
                <Text style={styles.description}>{`El estudiante ${notification.fromStudent.name} ahora te sigue`}</Text>
            }
            {notification.category !== 'NewFollow' && notification.project.file[0] &&

                <View style={{ width: 200, marginTop: 5 }}>

                    <img src={notification.project.file[0].file.url} />

                </View>
            }
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#555',
        borderWidth: 0.5,
        padding: 20,
    },
    containerDataJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    containerData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#fff',
    },
    titleNotification: {
        fontWeight: 900,
        fontSize: 16,
        marginRight: 10,
    },
    description: {
        color: '#666',

    }
});

export default CardNotification;
