import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Message from "./Message";
import { useSelector } from 'react-redux';
import FileMessage from "../preview/files/FileMessage";

const ChatMessages = ({ typing }) => {
    const { messages, activeConversation } = useSelector((state) => state.chat);
    const { student } = useSelector((state) => state.student);
    const endRef = useRef();
    useEffect(() => {
        scrollToBottom();
    }, [messages, typing]);
    const scrollToBottom = () => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <View style={styles.containerMessage}>
            {messages && messages.map((message, index) => (
                <View key={message._id} style={styles.container}>
                    {message.files.length > 0 && message.files.map((file, fileIndex) => (
                        <FileMessage
                            FileMessage={file}
                            message={message}
                            key={`${message._id}-file-${fileIndex}`}
                            me={student._id === message.sender._id}
                        />
                    ))}
                    {message.message.length > 0 && (
                        <Message
                            student={student}
                            message={message}
                            key={`${message._id}-text`}
                            me={student._id === message.sender._id}
                        />
                    )}
                </View>
            ))}

            {typing === activeConversation._id ? <Text style={{ color: '#fff', fontWeight: 700 }}>Typing</Text> : null}
            <View ref={endRef}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerMessage:{
        width: '100%',
        height: '100%',
    },
    container:{
        width: 'auto',
        height: 'auto',
        margin: 20
    }
});
export default ChatMessages