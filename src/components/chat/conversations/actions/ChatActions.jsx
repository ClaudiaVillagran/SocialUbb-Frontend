import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../../features/chatSlice";
import { Pressable, View } from "react-native";
import SocketContext from "../../../../context/SocketContext";
import Input from "./Input";
import Attachments from "./attachments/Attachments";
import { BsSendFill } from "react-icons/bs";
import { MdNearMeDisabled } from "react-icons/md";


const ChatActions = ({ socket }) => {
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const { activeConversation, status } = useSelector((state) => state.chat);
    const [loading, setLoading] = useState(false);
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const [message, setMessage] = useState("");
    const textRef = useRef();
    const values = {
        message,
        convo_id: activeConversation._id,
        files: [],
        token,
    };
    const SendMessageHandler = async (e) => {
        e.preventDefault();
        //  console.log('object');
        // console.log(values);
        setLoading(true);
        let newMessage = await dispatch(sendMessage(values));
        // console.log(newMessage);
        socket.emit('sendMessage', newMessage.payload)
        setMessage("");
        setTimeout(() => {
            setLoading(false);
        }, 500);
        // socket.emit('send message', newMessage.payload);
    };
    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#222428', justifyContent: 'space-around', alignItems: 'center' }}>
            <View>
                <Attachments
                    showAttachments={showAttachments}
                    setShowAttachments={setShowAttachments}
                    setShowPicker={setShowPicker}

                />
            </View>

            <Input message={message} setMessage={setMessage} textRef={textRef} />
            {status === "loading" && loading ? (
                <MdNearMeDisabled style={{ fill: '#ccc' }} />

            ) : (

                <Pressable onPress={SendMessageHandler}>
                    <BsSendFill style={{ fill: '#ccc' }} />
                </Pressable>
            )}
        </View>
    )
}

const ChatActionsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatActions {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ChatActionsWithSocket