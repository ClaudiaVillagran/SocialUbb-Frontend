import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { clearFiles } from '../../../../features/chatSlice';
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const Header = ({ activeIndex }) => {
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.chat);
    const clearFilesHandler = () => {
        dispatch(clearFiles());
    };
    return (
        <View style={styles.container}>
            <Pressable onPress={() => clearFilesHandler()}>
                <IoMdClose size={32} style={{fill: '#ccc'}}/>
            </Pressable>
            <Text style={{color: '#ccc', alignSelf:'center'}}>
                {files[activeIndex]?.file?.name}
            </Text>
            <Text>
                
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    }
})
export default Header