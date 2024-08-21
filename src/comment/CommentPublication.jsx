import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveComment } from "../features/publicationSlice";

const CommentPublication = ({ pub, commentInputRef }) => {
    const [placeholder, setPlaceholder] = useState('Ingresa un comentario...');
    const { student } = useSelector((state) => state.student);
    const [commentText, setCommentText] = useState('');

    const { token } = student
    const dispatch = useDispatch();

    const handleCommentSubmit = () => {
        if (commentText.trim() !== '') {

            dispatch(saveComment({ token, publicationId: pub._id, text: commentText }));
            // dispatch(addComment(postId, { text: commentText }));
            setCommentText('');
        } else {
            console.log('Debe ingresar un comentario');
        }
    };
    return (
        <View style={{ flexDirection: 'row', alignItems:'center' }}>
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
                <Text style={{ color: '#0040b0', marginTop: 10 }}>Comentar</Text>
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
        marginLeft: 3,
        marginTop: 10,
        marginRight: 10,
        outlineWidth: 0,

    },
});

export default CommentPublication;
