import { ScrollView, StyleSheet, Text, View } from "react-native"
import ContactWithSocket from "./Contact"

const SearchResults = ({ searchResults, setSearchResults }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={{color: '#0040b0', fontSize: 20, fontWeight: '300'}}>RESULTADOS</Text>
            {searchResults &&
                searchResults.map((user) => (
                    <ContactWithSocket contact={user} key={user._id} setSearchResults={setSearchResults} />
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});
export default SearchResults