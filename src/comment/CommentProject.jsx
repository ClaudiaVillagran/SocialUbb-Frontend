import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveComment } from "../features/projectSlice";
import SocketContext from "../context/SocketContext";
import { Button } from "react-native-elements";

const CommentProject = ({ project, commentInputRef, socket }) => {
    const [placeholder, setPlaceholder] = useState('Ingresa un comentario...');
    const { student } = useSelector((state) => state.student);
    const [commentText, setCommentText] = useState('');
    const [loadingSend, setLoadingSend] = useState(false);

    const { token } = student
    const dispatch = useDispatch();

    const handleCommentSubmit = () => {
        setLoadingSend(true);
        if (commentText.trim() !== '') {

            dispatch(saveComment({ token, projectId: project._id, text: commentText }));
            // dispatch(addComment(postId, { text: commentText }));

            socket.emit('newComment', project, student);
            setCommentText('');
            setTimeout(() => {
                setLoadingSend(false)
            }, 500);
        } else {
            console.log('Debe ingresar un comentario');
            setTimeout(() => {
                setLoadingSend(false)
            }, 500);
        }
    };
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                ref={commentInputRef}
                placeholder={placeholder}
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder('Ingresa un comentario...')}
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                style={styles.textInput} placeholderTextColor="#999"
            />
            <Pressable onPress={handleCommentSubmit}>
                {loadingSend ?
                    <Button loading
                        buttonStyle={{
                            marginTop: 10,
                            backgroundColor: 'transparent',
                        }}
                    />
                    :
                    <Text style={{ color: '#0040b0', marginTop: 10 }}>Comentar</Text>
                }
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        color: '#fff',
        paddingBlock: 2,
        fontSize: 16,
        borderRadius: 5,
        outlineWidth: 0,
        marginTop: 10,
        marginRight: 10,
        outlineWidth: 0,

    },
});

const CommentProjectWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <CommentProject {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default CommentProjectWithSocket;
