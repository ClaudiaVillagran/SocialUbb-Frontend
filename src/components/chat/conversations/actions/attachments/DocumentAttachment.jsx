import { useRef } from 'react';
import { View, Pressable } from 'react-native';
import { IoIosDocument } from "react-icons/io";
import { addFiles } from '../../../../../features/chatSlice';
import { useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker'; // Importa DocumentPicker de expo para seleccionar documentos
import { getFileType } from '../../../../../utils/file';

const DocumentAttachment = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const documentHandler = async (e) => {
        // console.log(e)
        try {
            const result = await DocumentPicker.getDocumentAsync(); // Utiliza DocumentPicker para seleccionar un documento
            // console.log(result);
            if (result.assets && result.assets.length > 0) {
                const selectedFile = result.assets[0];
                // Verifica si se seleccionó un documento exitosamente
                dispatch(
                    addFiles({
                        file: selectedFile,
                        type: getFileType(selectedFile.mimeType), // Define el tipo del archivo como 'DOCUMENT' (puedes ajustarlo según tu necesidad)
                    })
                );
            }
        } catch (error) {
            console.log('Error al seleccionar el documento:', error);
        }
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <Pressable onPress={documentHandler}>
                <IoIosDocument style={{ fill: '#ccc' }} />
            </Pressable>
        </View>
    );
};

export default DocumentAttachment;
