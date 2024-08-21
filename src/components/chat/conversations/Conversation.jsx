import { useDispatch, useSelector } from "react-redux";
import { getConversationId, getConversationImage, getConversationName } from "../../../utils/chat";
import { open_create_conversation, updateMessageAndConversation } from "../../../features/chatSlice";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";
import { useEffect } from "react";
import { dateHandler } from "../../../utils/date";

const Conversation = ({ convo, socket, typing }) => {
    // console.log('first')
    // console.log(convo)
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    // console.log(student);
    const values = {
        receiver_id: getConversationId(student, convo.students),
        isGroup: convo.isGroup ? convo._id : false,
        token,
    };
    const openConversation = async () => {
        let newConvo = await dispatch(open_create_conversation(values));
        // console.log(newConvo);
        socket.emit('join conversation', newConvo.payload._id)
    };
    useEffect(() => {
        socket.on('messageReceived', (message) => {
            dispatch(updateMessageAndConversation(message))
        })

    }, [])
    return (
        <Pressable style={styles.container} onPress={() => openConversation()} >
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Avatar size={32} 
                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }} 
                    rounded source={{
                    uri: (convo.isGroup
                        ? convo.image
                        : getConversationImage(student, convo.students)
                    )
                }}
                />
                <View style={{marginLeft: 10, }}>
                    <Text style={{ color: "#fff" }}>
                        {convo.isGroup
                            ? convo.name
                            :
                            capitalize(getConversationName(student, convo.students))}
                    </Text >
                    {typing === convo._id ? (
                        <Text style={{ color: "#fff" }}>Typing...</Text>
                    ) : (
                        <Text style={{ color: "#888" }}>
                            {convo.latestMessage?.message.length > 25
                                ? `${convo.latestMessage?.message.substring(0, 25)}...`
                                : convo.latestMessage?.message}
                        </Text>
                    )}
                </View>
            </View>
            <Text style={{ color: "#fff" }}>
                {convo.latestMessage?.createdAt
                    ? dateHandler(convo.latestMessage?.createdAt)
                    : ""}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,

    },
});
const ConversationWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Conversation {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ConversationWithSocket;