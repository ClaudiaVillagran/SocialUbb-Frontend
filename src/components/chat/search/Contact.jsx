import { Pressable, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import { Avatar } from "react-native-elements";
import SocketContext from "../../../context/SocketContext";
import { capitalize } from "../../../utils/string";


const Contact = ({ contact, setSearchResults, socket }) => {
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const values = {
        receiver_id: contact._id,
        token,
    };
    const openConversation = async () => {
        // console.log(values)
        let newConvo = await dispatch(open_create_conversation(values));
        // console.log(newConvo);
        setSearchResults([]);
        socket.emit('join conversation', newConvo.payload._id)
    };

    return (
        <Pressable onPress={() => openConversation()} style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
            <View>
                <Avatar size={32}
                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                    rounded source={{ uri: (contact.image) }} 
                />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#fff' }}>{capitalize(contact.name)}</Text>
                <Text style={{ color: '#fff' }}>{contact.bio}</Text>
            </View>
        </Pressable>
    )
}
const ContactWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Contact {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ContactWithSocket

