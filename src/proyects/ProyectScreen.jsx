import React from 'react'; // Importa React para poder utilizar JSX
import { StyleSheet, Text, View } from 'react-native'; // Importa Text de react-native
import CreatePub from '../publications/CreatePub';
import ProyectList from './ProyectList';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { feed } from '../features/projectSlice';
import SocketContext from '../context/SocketContext';
import { Button } from '@rneui/themed';

const ProyectStudentScreen = ({ socket }) => {
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [newPost, setNewPost] = useState()
    const [allProjects, setAllProjects] = useState({})


    const { projects, status, error } = useSelector((state) => state.project);

    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [dispatch, token, page]);

    useEffect(() => {
        socket.on('newLikeRecived', (studentPro) => {
            console.log('first')
            console.log('al estudiante', studentPro._id, 'le gustó tu proyecto')
        })

    }, [])

    const fetchData = async () => {
        try {
            const projectFeed = await dispatch(feed({ token, page }));

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching publications:", error);
        }
    };

    return (
        <View style={styles.screen}>
            <CreatePub setNewPost={setNewPost} />
            {/* {!isLoading &&
                <ProyectList projects={allProjects} />
            } */}

            {!projects ?
                <Button loading
                    buttonStyle={{
                        marginTop: 10,
                        backgroundColor: 'transparent',
                    }}
                />
                :
                <ProyectList projects={projects} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    screen: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
});

const ProyectStudentScreenWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ProyectStudentScreen {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ProyectStudentScreenWithSocket;
