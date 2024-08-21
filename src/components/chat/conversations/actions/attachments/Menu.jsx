import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IoMdContact } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import PhotoAttachment from './PhotoAttachment';
import DocumentAttachment from './DocumentAttachment';

const Menu = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <DocumentAttachment />
            <PhotoAttachment />
        </View>
    );
}

export default Menu;
