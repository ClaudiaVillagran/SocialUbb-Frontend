import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Actions from "./Actions";
import moment from "moment";
import { Avatar } from 'react-native-elements';
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Global } from "../helpers/Global";
import { useDispatch, useSelector } from 'react-redux';
import { deletePub, feed, likePublication, unlikePublication } from '../features/publicationSlice';
import CommentsPublications from "../comment/CommentsPublications";
import CommentPublication from "../comment/CommentPublication";
import { dateHandler } from "../utils/date";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";

const PubItem = ({ pub }) => {
    // console.log(pub);
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const dispatch = useDispatch()

    const commentInputRef = useRef(null);

    const handleCommentIconClick = () => {
        commentInputRef.current.focus();
    };

    //  console.log(publicationData);
    const handleLike = async () => {
        dispatch(likePublication({ token, publicationId: pub._id }))
    };

    const handleDislike = () => {
        dispatch(unlikePublication({ token, publicationId: pub._id }))
    };

    const deletePublication = (pubId) => {
        dispatch(deletePub({ token, publicationId: pubId }));
    };

    return (
        <View key={pub.id} style={styles.container}>
            <View style={styles.containerPub}>
                <View style={{ flexDirection: 'row' }}>

                  <Avatar size={32}
                        rounded
                        containerStyle={{ marginRight: 10 }}
                        source={{ uri: pub.student.image}}
                        alt="Foto de perfil"
                        sx={{ p: 0.5, border: '1.5px solid', borderColor: '#ffcc33' }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.text, styles.name]}>{pub.student.name}</Text>
                        {/* agregar la info de la carrera al modelo */}
                        <Text style={styles.carreer}>@IECI</Text>
                    </View>

                </View>

                <View style={styles.containerButton}>
                    {pub.student._id === student._id &&
                        <Pressable onPress={() => deletePublication(pub._id)}>
                            <IoClose size={28} style={{ fill: '#ccc' }} />
                        </Pressable>

                    }
                </View>
            </View>

            <View>
                <Text style={styles.moment}>{`Hace ${dateHandler(pub.created_at)}`}</Text>
            </View>
            <View style={styles.containerInfoPub}>
                <Text style={[styles.text, styles.pub]}>{pub.text}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {pub.hashtags.map((hashtag, i) => {
                        return (
                            <Text style={styles.materialsTitle} key={i}>{`#${hashtag}`}</Text>
                        )
                    })}
                </View>

                {pub.file &&
                    <View style={styles.containerImage}>
                        <Image source={{ uri: (Global.url + 'publication/media/' + pub.file) }} style={styles.image} />
                    </View>
                }
            </View>
            <View style={{ flexDirection: 'row' }}>
                {pub.likes.includes(student._id)
                    ?
                    <Pressable onPress={handleDislike}>
                        <FcLike size={15} style={styles.icon} />
                    </Pressable>
                    :
                    <Pressable onPress={handleLike}>
                        <FaRegHeart size={15} style={styles.icon} />
                    </Pressable>
                }
                <Pressable onPress={handleCommentIconClick}>
                    <FaRegComment size={15} style={styles.icon} />
                </Pressable>
            </View>
            <View>
                <Text style={styles.textLikes}> {`${pub.likes.length} Me gusta`}</Text>
            </View>

            <CommentsPublications pub={pub} />

            <CommentPublication commentInputRef={commentInputRef} pub={pub} />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    container: {
        borderWidth: 0.5,
        borderBottomColor: '#555',
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'start',
        justifyContent: 'center',
        padding: 10,
    },
    carreer: {
        color: '#666',
        fontSize: 16,
    },
    name: {
        fontWeight: 900,
        fontSize: 16,
        marginRight: 10,
    },
    pub: {
        marginTop: 10,
    },
    containerButton: {
    },
    containerPub: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between', // Agregar espacio entre los elementos
        alignItems: 'center',

    },
    materialsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffcc33',
        marginBottom: 5,
        marginRight: 5,
        fontStyle: 'italic',
    },
    containerInfoPub: {
        width: '100%',
        height: 'auto',
    },
    containerImage: {
        marginTop: 10, // Espacio entre el texto y la imagen
        marginBottom: 10,
        alignItems: 'center', // Alinea la imagen al centro
        aspectRatio: 12 / 9, // Relación de aspecto de la imagen (opcional)
    },
    image: {
        width: '100%', // O ajusta el ancho según tus necesidades
        height: '100%', // O ajusta el alto según tus necesidades
        resizeMode: 'cover', // Ajusta la imagen para cubrir la totalidad del contenedor
        borderRadius: 10, // Bordes redondeados para una apariencia más estética
    },
    icon: {
        color: "#999",
        marginRight: 10,
    },
    textLikes: {
        color: '#ccc',
        marginTop: 10,
    },
    moment: {

        color: '#ccc',
        marginTop: 10,
    }
});

export default PubItem;