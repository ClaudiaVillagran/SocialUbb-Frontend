import { Image, StyleSheet, Text, View } from "react-native"
import moment from "moment";

import FileImageVideo from "./FileImageVideo";
import FileOthers from "./FileOthers";

const FileMessage = ({ FileMessage, message, me }) => {

    const { file, type } = FileMessage;
    // console.log(file);
    //  console.log(type);
    return (
        <View style={styles.container}>
            {!me && message.conversation.isGroup && (
                <View>
                    <Image source={{ uri: (message.sender.image) }} />
                </View>
            )}
            <View style={styles.containerImage}>
                {type === 'IMAGE' || type === 'VIDEO' ? (
                    <FileImageVideo url={file.secure_url} type={type} />
                ) : (
                    <FileOthers file={file} type={type} me={me} />
                )}
                <Text style={{color: '#777'}}>{moment(message.createdAt).format("HH:mm")}</Text>
                {/* {!me ? (
                    <Text>
                        <TraingleIcon className="triangleChat" />
                    </Text>
                ) : null} */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: 'auto',
        backgroundColor: '#222aa8',
    },
    containerImage:{
        width: '100%',
        height: '100%',
    }
});

export default FileMessage