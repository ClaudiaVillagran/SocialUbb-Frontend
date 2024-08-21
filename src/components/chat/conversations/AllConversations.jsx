import { ScrollView, StyleSheet, View } from "react-native"
import SocketContext from "../../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import ConversationWithSocket from "./Conversation";

const AllConversations = ({ socket, typing }) => {
    const dispatch = useDispatch();
    const { conversations, activeConversation } = useSelector(
        (state) => state.chat
    );
    return (
        <ScrollView style={styles.container}>
            {conversations &&
                conversations
                    .filter(
                        (c) =>
                            c.latestMessage ||
                            c._id === activeConversation._id ||
                            c.isGroup == true
                    )
                    .map((convo) => <ConversationWithSocket typing={typing} convo={convo} key={convo._id} />)}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});
const AllConversationsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <AllConversations {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default AllConversationsWithSocket