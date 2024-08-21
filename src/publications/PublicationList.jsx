import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import PubItem from "./PubItem";
import { useSelector } from "react-redux";

const PublicationList = () => {
    const { publications, status, error } = useSelector((state) => state.publication);

    return (
        <View style={{ width: '100%', flex: 1 }}>
              <FlatList
                    data={publications}
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
        width: '100%'
    }
});

export default PublicationList;
