import { StyleSheet, Text, View } from 'react-native';
import CreatePub from './CreatePub';
import PublicationList from './PublicationList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { feed } from '../features/publicationSlice';

const PublicationScreen = () => {
    const [page, setPage] = useState();
    const [more, setMore] = useState(true);
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.student);
    const { token } = student;


    // console.log(student, 'publicationScreed')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPublications = await dispatch(feed({ token}));
                // console.log(fetchedPublications)
               

            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };
        fetchData();
    }, [dispatch, token, page]);
    
    return (
        <View style={styles.screen}>
            <CreatePub />
            <PublicationList />
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

export default PublicationScreen;
