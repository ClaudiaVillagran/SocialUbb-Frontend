import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublicationListStudent from './PublicationListStudent';
import CreatePub from '../../../publications/CreatePub';

import { getPublicationStudent } from '../../../features/publicationSlice';

const PublicationStudentScreen = ({ activeStudent }) => {
    const { _id } = activeStudent.student;
    // console.log(' publication')
    // console.log(_id)
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [newPost, setNewPost] = useState(false);
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student;

    useEffect(() => {

        const fetchData = async () => {
            try {
                const fetchedPublications = await dispatch(getPublicationStudent({token, id:_id }));


            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };
        fetchData();
    }, [dispatch, token, page]);
    return (
        <View style={styles.screen}>
            <CreatePub />
            <PublicationListStudent />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    screen: {
        flex: 1,
        height:'100%',
        backgroundColor: '#000',
        alignItems: 'center',

    },
});

export default PublicationStudentScreen;
