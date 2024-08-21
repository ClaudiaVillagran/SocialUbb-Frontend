import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SocketContext from "../../../../context/SocketContext";
import { useSelector } from "react-redux";

const Input = ({ message, setMessage, textRef, socket }) => {
    const { activeConversation } = useSelector((state) => state.chat);

    const [typing, setTyping] = useState(false);
    const onChangeHandler = (e) => {
        setMessage(e.target.value);
        if (!typing) {
            setTyping(true);
            socket.emit("typing", activeConversation._id);
        }
        let lastTypingTime = new Date().getTime();
        // console.log('lastTypingTime', lastTypingTime);
        let timer = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            // console.log('timeNow',timeNow);
            let timeDiff = timeNow - lastTypingTime;

            // console.log('timeDiff before if', timeDiff);
            if (timeDiff >= timer) {
                // console.log('timeDiff', timeDiff);
                socket.emit("stop typing", activeConversation._id);
                setTyping(false);
            }
        }, timer);
    };
    return (
        <View style={{width:'70%'}}>
            <TextInput 
                style={styles.textInput}
                type="text"
                placeholder="Escribe un mensaje"
                value={message}
                onChange={onChangeHandler}
                ref={textRef} 
            />
        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: '100%',
        backgroundColor: '#455765',
        color: '#fff',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        outlineWidth: 0,
    },
});
const InputWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Input {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default InputWithSocket;