import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ProyectItem from "./ProyectItem";

import { useSelector } from "react-redux";
import { Button } from "@rneui/themed";

const ProyectList = ({ projects }) => {

    // console.log(projects)

    // const { projects, status, error } = useSelector((state) => state.project);

    return (
        <View style={{ width: '100%', flex: 1 }}>

            {!projects ?
                <Button loading
                    buttonStyle={{
                        marginTop: 10,
                        backgroundColor: 'transparent',
                    }}
                />
                :

                <FlatList
                    data={projects}
                    ItemSeparatorComponent={() => <Text />}
                    renderItem={({ item: project }) => (
                        <ProyectItem project={project} />
                    )}

                    contentContainerStyle={styles.listContent}
                >
                </FlatList>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    listContent: {
        flex: 1,
        width: '100%',
    }
});

export default ProyectList;
