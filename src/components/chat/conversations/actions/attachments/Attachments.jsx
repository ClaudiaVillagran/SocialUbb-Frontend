import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Menu from "./Menu";
import { IoClose } from "react-icons/io5";
import { MdAttachment } from "react-icons/md";


const Attachments = ({ showAttachments, setShowAttachments, setShowPicker }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    setShowPicker(false);
                    setShowAttachments((prev) => !prev);
                }}
            >
                {showAttachments ? (
                    <IoClose   style={{fill: '#ccc'}}/>
                ) : (
                    <MdAttachment  style={{fill: '#ccc'}} />

                )}
            </TouchableOpacity>
            {/*Menu*/}
            {showAttachments ? <Menu /> : null}
        </View>
    );
}

export default Attachments;
