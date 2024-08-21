import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../../../utils/upload';
import { sendMessage, removeFileFromFiles } from '../../../../features/chatSlice';
import { IoMdClose } from "react-icons/io";
import Add from "./Add";
import { BsSendFill } from "react-icons/bs";
import { MdNearMeDisabled } from "react-icons/md";
import SocketContext from '../../../../context/SocketContext';

const HandleAndSend = ({ activeIndex, setActiveIndex, message, socket }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { files, activeConversation } = useSelector((state) => state.chat);
    const { student } = useSelector((state) => state.student);
    const { token } = student;

    // console.log('files', files);
    // Send message handler
    const sendMessageHandler = async () => {
        setLoading(true);
        // Upload files first
        const uploadedFiles = await uploadFiles(files);
        // console.log('uploadedFiles',uploadedFiles)
        // Send the message
        const values = {
            token,
            message,
            convo_id: activeConversation._id,
            files: uploadedFiles.length > 0 ? uploadedFiles : [],
        };
        let newMsg = await dispatch(sendMessage(values));
        socket.emit('sendMessage', newMsg.payload);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    // Handle remove file
    const handleRemoveFile = (index) => {
        dispatch(removeFileFromFiles(index));
    };

    return (
        <View style={styles.container}>
            {/* Empty */}
            <View style={styles.empty}></View>
            {/* List files */}
            <View style={styles.fileList}>
                {files.map((file, i) => (
                    <TouchableOpacity key={i} style={styles.filePreview} onPress={() => setActiveIndex(i)}>
                        {file.type === 'IMAGE' ? (
                            <Image source={{ uri: file.fileData }} style={styles.imagePreview} />
                        ) : file.type === 'VIDEO' ? (
                            <Video source={{ uri: file.fileData }} style={styles.videoPreview} />
                        ) : (
                            <Image source={{ uri: `../../../../images/file/${file.type}.png` }} style={styles.imagePreview} />
                        )}
                        {/* Remove file icon */}
                        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFile(i)}>
                            <IoMdClose />

                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                {/* Add another file */}
                <Add setActiveIndex={setActiveIndex} />
            </View>
            {/* Send button */}
            <TouchableOpacity style={styles.sendButton} onPress={sendMessageHandler}>
                {loading ? <MdNearMeDisabled style={{ fill: '#ccc' }} /> : <BsSendFill style={{ fill: '#ccc' }} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    empty: {
        flex: 1,
    },
    fileList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filePreview: {
        margin: 5,
        position: 'relative',
    },
    imagePreview: {
        width: 50,
        height: 50,
    },
    videoPreview: {
        width: 50,
        height: 50,
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    sendButton: {
        marginLeft: 10,
    },
};

const HandleAndSendWithContext = (props) => (
    <SocketContext.Consumer>
        {(socket) => <HandleAndSend {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default HandleAndSendWithContext;
