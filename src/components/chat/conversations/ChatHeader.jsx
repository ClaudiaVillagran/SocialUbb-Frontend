import { useSelector } from "react-redux";
import { checkOnlineStatus, getConversationImage, getConversationName } from "../../../utils/chat";
import { Avatar } from "react-native-elements";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";
import { HiDotsVertical } from "react-icons/hi";

const ChatHeader = ({ onlineStudents, socket }) => {
    const { activeConversation, conversations } = useSelector((state) => state.chat)
    const { name, image } = activeConversation

    const { student } = useSelector((state) => state.student);

    let check = checkOnlineStatus(onlineStudents, student, activeConversation.students);
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Avatar size={32}
                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }} 
                    rounded source={{
                    uri: (activeConversation.isGroup
                        ? activeConversation.image
                        : getConversationImage(student, activeConversation.students))
                }}
                />
                <View>
                    <Text style={{ color: '#fff', marginLeft: 10, fontWeight: '600' }}>{activeConversation.isGroup
                        ? activeConversation.name
                        : capitalize(getConversationName(student, activeConversation.students).split(" ")[0])
                    }
                    </Text>
                    {check ? <Text style={{ color: '#fff', marginLeft: 10, fontWeight: '100' }}>Online</Text> : <Text></Text>}
                </View>
            </View>
            <Pressable>
                <HiDotsVertical style={{ fill: '#ccc' }} />
            </Pressable>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#222428',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
const ChatHeaderWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatHeader {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ChatHeaderWithSocket;