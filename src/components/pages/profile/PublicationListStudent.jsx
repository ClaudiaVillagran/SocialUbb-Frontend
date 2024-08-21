import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import PubItem from "../../../publications/PubItem";

const PublicationListStudent = () => {

    const { publicationsStudent } = useSelector((state) => state.publication);

    return (
        <View style={{ width: '100%', flex: 1, height: '100%'}}>
              <FlatList
                    data={publicationsStudent}
                    ItemSeparatorComponent={() => <Text />}
                    renderItem={({ item }) => (
                        <PubItem pub={item} />
                    )}

                    contentContainerStyle={styles.listContent}
                ></FlatList>
        </View>
    )
}
const styles = StyleSheet.create({
    listContent: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});

export default PublicationListStudent;
