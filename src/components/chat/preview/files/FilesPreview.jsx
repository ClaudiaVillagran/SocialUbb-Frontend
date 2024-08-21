import { useState } from "react";
import { StyleSheet, View } from "react-native"

import FileViewer from "./FileViewer";
import HandleAndSend from "./HandleAndSend";
import Header from "./Header";
import Input from "./Input";


const FilesPreview = () => {
    const [message, setMessage] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <View style={styles.container}>

            <Header activeIndex={activeIndex} />
            {/*Viewing selected file*/}
            <FileViewer activeIndex={activeIndex} />
            <View>
                {/*Message Input*/}
                <Input message={message} setMessage={setMessage} />
                {/*Send and manipulate files*/}
                <HandleAndSend
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    message={message}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#343640',
        height: '100%',
    }
})
export default FilesPreview