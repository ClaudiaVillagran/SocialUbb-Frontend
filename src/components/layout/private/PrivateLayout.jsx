import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../navbar/NavBar";
import { Routing } from "../../../router/Routing";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { getConversations } from '../../../features/chatSlice';

import { saveNotification, updateNotificationCount } from '../../../features/notificationSlice';

import SocketContext from '../../../context/SocketContext';

const PrivateLayout = ({ socket }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student
    const [onlineStudents, setOnlineStudents] = useState([]);
    

    useEffect(() => {
        socket.emit('join', student);
        if (student?.token) {
            dispatch(getConversations(student.token));
            //console.log(student)
        }
    }, [student]);

    useEffect(() => {
        socket.on('get-online-students', (students) => {
            // console.log('online students')
            // console.log(students)
            setOnlineStudents(students);
            // console.log(onlineStudents)
        })
        socket.on('newLikeRecived', (fromStudent, toProject) => {

            CreateLikeNotification(fromStudent, toProject);
        })
        socket.on('newCommentRecived', (fromStudent, toProject) => {

            CreateCommetNotification(fromStudent, toProject);
        })
        socket.on('newPartnerRecived', (fromStudent, toProject) => {

            CreatePartnerNotification(fromStudent, toProject);
        })
        socket.on('newFollowRecived', (fromStudent) => {
        
            CreateFollowNotification(fromStudent);
        })
    }, [socket]);

    const CreateLikeNotification = async (fromStudent, toProject) => {
        await dispatch(saveNotification({ token, fromStudent, category: 'NewLike', project: toProject }));
    };
    const CreateCommetNotification = async (fromStudent, toProject) => {
        await dispatch(saveNotification({ token, fromStudent, category: 'NewComment', project: toProject }));
    };
    const CreatePartnerNotification = async (fromStudent, toProject) => {
        await dispatch(saveNotification({ token, fromStudent, category: 'NewPartner', project: toProject }));
    };
    const CreateFollowNotification = async (fromStudent) => {
        await dispatch(saveNotification({ token, fromStudent, category: 'NewFollow', project: '' }));
    };

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} />
            <Routing socket={socket} onlineStudents={onlineStudents} />

        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
        flexDirection: 'row',
        maxHeight: '100vh',
    },
});
const PrivateLayoutWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <PrivateLayout {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default PrivateLayoutWithSocket;