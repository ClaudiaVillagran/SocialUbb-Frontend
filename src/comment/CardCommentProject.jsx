import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { deleteMeComment, getComment } from "../features/projectSlice";
import { Avatar } from "react-native-elements";

const CardCommentProject = ({ comment, projectId }) => {
    // console.log(publicationId)
    // console.log(comment)
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    // console.log(student);
    // const [commentDetail, setCommentDetail] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // console.log(commentId)
    // useEffect(() => {
    //     const fetchActiveComment = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await dispatch(getComment({ token, commentId }));
    //             console.log(response);
    //             const comment = response.payload.comment;
    //             setCommentDetail(comment[0]);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching active comment:", error);
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchActiveComment();
    // }, [commentId, dispatch, token, publicationId]);


    const deleteComment = (commentId) => {
        dispatch(deleteMeComment({ token, commentId, projectId: projectId }));
    };
    return (
        <View style={{ marginBottom: 10, width: '100%' }}>

            {comment ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <View>
                           
                                <Avatar size={32} 
                                    containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }} 
                                    rounded 
                                    source={{ uri: `${comment.student.image}` }} 
                                />
                        </View>
                        <View>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}> {`${comment.student.name.toUpperCase()} :`}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#ccc' }}> {comment.text}</Text>
                        </View>
                    </View>
                    <View >
                        {comment.student._id === student._id && (
                            <Pressable onPress={() => deleteComment(comment._id)}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                            </Pressable>
                        )}
                    </View>
                </View>

            ) : (<Text>No existen comentarios</Text>)
            }
        </View>
    )
}

export default CardCommentProject