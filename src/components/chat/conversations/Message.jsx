import { Image, StyleSheet, Text, View } from "react-native"
import moment from "moment";

const Message = ({student, message, me }) => {

    return (
        <View style={[styles.container, me ? styles.meContainer : styles.otherContainer]}>
            {!me && message.conversation.isGroup && (
                <View>
                    <Image
                        source={{ uri: (message.sender.image) }}
                        alt=""
                    />
                </View>
            )}
            <View style={{padding: 5}}>
                {/*Message*/}
                <Text style={{color:'#ccc'}}>
                    {message.message}
                </Text>
                {/*Message Date*/}
                <Text style={{color:'#777', alignSelf: 'flex-end'}}>
                    {moment(message.createdAt).format("HH:mm")}
                </Text>
                {/*Traingle*/}
                {/* {!me ? (
                    <Text>
                        <TraingleIcon className="triangleChat" />
                    </Text>
                ) : null} */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222aa8',
        margin: 10,
        borderRadius:5,
        width: '50%',
    },
    meContainer:{
        alignSelf: 'end'
    }
});
export default Message