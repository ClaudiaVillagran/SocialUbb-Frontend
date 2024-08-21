import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeComment, getComments } from "../features/publicationSlice";
import CardComment from "./CardComment";
import { useEffect } from "react";

const CommentsPublications = ({ pub }) => {
    // console.log(pub)
    // const post = useSelector((state) => state.publication.publications.find((p) => p._id === pub._id));
    // if (!post) return null;
    if (pub.length < 0) return null;

    const [seeComments, setSeeComments] = useState(false);
    const { student } = useSelector((state) => state.student);
    const [commentsArray, setCommentsArray] = useState([]);
    const [countComments, setCountComments] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const { token } = student;
    const dispatch = useDispatch();

    useEffect(() => {
        getAllComments()
    }, [pub])

    const getAllComments = async () => {
        try {
            const commentsAction = await dispatch(getComments({ token, publicationId: pub._id }));
            // console.log(commentsAction.payload);
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
        <View style={{ marginLeft: 5, marginTop: 10, width: '96%' }}>
            {seeComments ?
                <View style={{ width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        {!isLoading && (
                            commentsArray.map((comment, i) => (
                                <CardComment
                                    key={i}
                                    comment={comment}
                                    publicationId={pub._id}
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

export default CommentsPublications