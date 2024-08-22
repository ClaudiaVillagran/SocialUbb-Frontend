import { Platform, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { useEffect, useRef, useState } from "react";
import { deleteProject, feed, likeProject, unlikeProject } from '../features/projectSlice';
import { IoClose } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import CommentProject from "../comment/CommentProject";
import CommentsProject from "../comment/CommentsProject";
import { open_create_conversation } from "../features/chatSlice";
import ModalParticipate from "./ModalParticipate";
import { IoLocationSharp } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";


import { formatedDate } from "../utils/formatedDate";
import SocketContext from "../context/SocketContext";

const ProyectItem = ({ project, socket }) => {
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const dispatch = useDispatch()
    const [visible1, setVisible1] = useState(false);
    const [checked, setChecked] = useState(1);
    const [convo, setConvo] = useState({})
    const [loadingClose, setLoadingClose] = useState(false);


    const commentInputRef = useRef(null);

    const [loadingParticipate, setLoadingParticipate] = useState(false)


    const participateFunction = async (id) => {
        setLoadingParticipate(true)
        const values = {
            receiver_id: id,
            token,
        };
        setConvo(await dispatch(open_create_conversation(values)));
        setTimeout(() => {
            setLoadingParticipate(false);
        }, 500);
        // console.log(convo);
        setVisible1(!visible1);
        // socket.emit('join conversation', newConvo.payload._id)
    };
    // useEffect(() => {
    //     if (project.student && student) {
    //         setLoading(false)
    //     }
    // }, [])

    const handleCommentIconClick = () => {
        commentInputRef.current.focus();
    };

    //  console.log(publicationData);
    const handleLike = async () => {
        dispatch(likeProject({ token, projectId: project._id }))
        // console.log(student)
        // console.log(project)
        socket.emit('newLike', project, student);
    };

    const handleDislike = () => {
        dispatch(unlikeProject({ token, projectId: project._id }))
    };

    const deletedProject = (projectId) => {
        setLoadingClose(true)
        dispatch(deleteProject({ token, projectId: projectId }));
        setTimeout(() => {
            setLoadingClose(false);
        }, 500);
    };

    return (
        <>
            {!project || !student ? <Button loading
                buttonStyle={{
                    marginTop: 10,
                    backgroundColor: 'transparent',
                }}
            />
                :
                <View key={project._id} style={styles.container}>

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Avatar size={32}
                                rounded
                                containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
                                source={{ uri: project.student.image }}
                                alt="Foto de perfil"
                                sx={{ p: 0.5, border: '0.5px solid', borderColor: '#ffcc33' }}
                            />

                            <View >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.text, styles.name]}>{project.student.name}</Text>
                                    <Text style={styles.carreer}>@IECI</Text>
                                </View>
                            </View>
                            {project.student._id !== student._id &&
                                <View style={styles.containerButtons}>
                                    <Button
                                        disabled={loadingParticipate ? true : false}
                                        title={loadingParticipate ? 'Cargando...' : 'Participar'}
                                        buttonStyle={{
                                            borderColor: '#fff',
                                            borderWidth: 0.5,
                                            borderRadius: 20,
                                        }}
                                        type="outline"
                                        titleStyle={{
                                            backgroundColor: 'transparent',
                                            color: '#fff',
                                        }}
                                        containerStyle={{
                                            marginRight: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                        }}
                                        onPress={() => participateFunction(project.student._id)}
                                    />
                                    {visible1 &&
                                        <ModalParticipate visible1={visible1} setVisible1={setVisible1} student={student} convo={convo.payload} project={project} />
                                    }
                                </View>
                            }
                        </View>
                        <View style={styles.containerButtonDelete}>
                            {project.student._id === student._id &&
                                <Pressable onPress={() => deletedProject(project._id)}>
                                    {loadingClose ?
                                        <Button loading
                                            buttonStyle={{
                                                marginTop: 10,
                                                backgroundColor: 'transparent',
                                            }}
                                        />
                                        :
                                        <IoClose size={28} style={{ fill: '#ccc' }} />
                                    }
                                </Pressable>
                            }
                        </View>
                    </View>
                    <View style={styles.containerDataProyect}>
                        <Text style={styles.title}>{project.title}</Text>
                        <Text style={styles.text}>{project.description}</Text>

                        <Text style={styles.place}><IoLocationSharp />{project.place}</Text>
                        {/* <Text style={styles.materialsTitle}><IoCalendarSharp />{` ${formatedDate(project.date)}`}</Text> */}
                        {project.file.length > 0 &&
                            <View style={styles.containerImage}>
                                <Image source={{ uri: (project.file[0].file.url) }} style={styles.image} />
                            </View>
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {project.likes.includes(student._id)
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
                        <Text style={styles.textLikes}>{`${project.likes.length} Me gusta`}</Text>
                    </View>

                    <CommentsProject project={project} />
                    <CommentProject commentInputRef={commentInputRef} project={project} />

                </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    container: {
        borderWidth: 0.5,
        borderBottomColor: '#555',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        padding: 5,
    },
    containerButtonDelete: {
        alignItems: 'center',
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
    proyect: {
        marginTop: 10,
    },
    containerButtons: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        backgroundColor: '#0040b0',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    containerButtonSecondary: {
        borderColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 20,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
    },
    containerDataProyect: {
        paddingVertical: 10,
        marginBlock: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    materialsTitle: {
        fontSize: 14,
        color: '#ffcc33',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    hashtagTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffcc33',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    materialsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    material: {
        fontSize: 14,
        color: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 5,
        backgroundColor: '#173966',
        marginRight: 10,
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
    place: {
        fontSize: 15, // Aumentar el tamaño de la fuente
        marginBottom: 5,
        color: '#fff', // Usar un color vibrante
        fontStyle: 'italic', // Opcional: hacer el texto en cursiva
    }
});
const ProyectItemWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ProyectItem {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ProyectItemWithSocket;