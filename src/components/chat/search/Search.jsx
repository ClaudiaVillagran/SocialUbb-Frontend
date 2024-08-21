import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios"; // Importar axios si aún no lo has hecho
import { Global } from "../../../helpers/Global";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";


const Search = ({ searchLength, setSearchResults }) => {
  const { student } = useSelector((state) => state.student);
  const { token } = student;
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${Global.url}student?search=${searchTerm}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row", alignItems: "center", marginTop: 10,
        backgroundColor: "#222428",
        borderRadius: 5, marginRight: 10,
      }}
    >
      {show || searchLength > 0 ? (
        <Pressable  style={{paddingHorizontal: 5, alignItems: 'center',marginTop:5}} onPress={() => setSearchResults([])} >
          <FaArrowLeft style={{fill: '#0040b0',}} />
        </Pressable>
      ) : (
        <Pressable style={{paddingHorizontal: 5, marginTop:5}} onPress={() => setShow(true)}>
          <IoSearch style={{fill: '#ccc'}}/>
        </Pressable>
      )}
      <TextInput
        placeholder="Buscar"
        style={styles.textInput}
        placeholderTextColor="#fff"
        onFocus={() => setShow(true)}
        onBlur={() => searchLength === 0 && setShow(false)}
        onChangeText={(text) => setSearchTerm(text)} // Actualizar el estado de búsqueda cuando el texto cambie
        value={searchTerm} // Asignar el valor del término de búsqueda al valor del TextInput
        onSubmitEditing={handleSearch} // Llamar a la función handleSearch cuando se presione la tecla Enter
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "#fff",
    paddingVertical: 10,
    width:'100%',
    fontSize: 13,
    marginTop: 5,
    outlineWidth: 0,
  },
});

export default Search;
