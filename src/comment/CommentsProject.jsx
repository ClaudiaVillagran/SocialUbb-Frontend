import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeComment, getComments } from "../features/projectSlice";
import CardCommentProject from "./CardCommentProject";
import { useEffect } from "react";

const CommentsProject = ({ project }) => {

    if (project.length < 0) return null;

    const [seeComments, setSeeComments] = useState(false);
    const { student } = useSelector((state) => state.student);
    const [commentsArray, setCommentsArray] = useState([]);
    const [countComments, setCountComments] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const { token } = student;
    const dispatch = useDispatch();

    useEffect(() => {
        getAllComments()
    }, [project])

    const getAllComments = async () => {
        try {
            const commentsAction = await dispatch(getComments({ token, projectId: project._id }));
            setCommentsArray(commentsAction.payload.comments)
            setCountComments(commentsAction.payload.comments.length)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }
    const seeMore = async (e) => {
        setSeeComments(true);
    };
    return (
        <View style={{  marginTop: 10, width: '96%' }}>
            {seeComments ?
                <View style={{ width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        {!isLoading && (
                            commentsArray.map((comment, i) => (
                                <CardCommentProject
                                    key={i}
                                    comment={comment}
                                    projectId={project._id}
                                />
                            ))
                        )}
                    </View>
                    <Pressable onPress={() => setSeeComments(false)}>
                        <Text style={{ color: '#ccc' }}>Ver menos</Text>
                    </Pressable>
                </View>
                :
                <View>
                    <Pressable onPress={seeMore}>
                        <Text style={{ color: '#ccc' }}>Ver los {countComments} comentarios</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default CommentsProject