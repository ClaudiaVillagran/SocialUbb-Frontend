
import { StyleSheet, Text, View } from 'react-native'; // Importa Text de react-native
import CreatePub from '../../../publications/CreatePub';
import ProyectListStudent from './ProyectListStudent';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProjectStudent } from '../../../features/projectSlice';

const ProyectScreen = ({activeStudent}) => {
    // console.log('first')
    const { _id } = activeStudent.student;
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [newPost, setNewPost] = useState(false)

    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await dispatch(getProjectStudent({ token, id:_id }));
            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };
        fetchData();
    }, [dispatch, token, page]);
    return (
        <View style={styles.screen}>
            <CreatePub/>
            <ProyectListStudent/>
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

export default ProyectScreen;
