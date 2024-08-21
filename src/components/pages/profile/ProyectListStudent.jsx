import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ProyectItem from "../../../proyects/ProyectItem";

import { useSelector } from "react-redux";

const ProyectListStudent = () => {

    const { projectsStudent, status, error } = useSelector((state) => state.project);

    return (
        <View style={{width:'100%', flex:1}}>
            <FlatList
                data={projectsStudent}
                ItemSeparatorComponent={() => <Text />}
                renderItem={({ item: project }) => (
                    <ProyectItem project={project} />
                )}

                contentContainerStyle={styles.listContent}
            >
            </FlatList>
        </View>
    )
}
const styles = StyleSheet.create({
    listContent: {
        flex: 1,
        width: '100%',
    }
});

export default ProyectListStudent;
