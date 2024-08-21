import React, { useRef, useState } from 'react'
import { RiUploadCloud2Line } from 'react-icons/ri'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { getFileType } from '../../utils/file'

export const InputImage = ({ setFileProject }) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [tooLong, setTooLong] = useState(false);

    const imageHandler = (e) => {
        const files = Array.from(e.nativeEvent.target.files);

        files.forEach((file) => {
            if (
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/gif" &&
                file.type !== "image/webp"
            ) {
                console.log("formato no aceptado");
                return;
            } else if (file.size > 1024 * 1024 * 10) {
                setTooLong(true);
                console.log("es demasiado largo");
                return;
            } else {
                const reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    setFileProject({
                        file: file,
                        fileData: e.target.result,
                        type: getFileType(file.type),
                    })
                };

            }
        });

    };
    function mostrarAlerta() {
        alert("El video es muy pesado");
    }
    return (
        <View>

            <Pressable style={styles.containerUpload} onPress={() => inputRef.current.click()} >
                <RiUploadCloud2Line size={20} style={styles.icon} />
                <Text style={styles.textUpload}>Subir archivo</Text>
            </Pressable>
            {tooLong ? (
                <Text>{mostrarAlerta()}</Text>
            ) : (
                <Text></Text>
            )}
            <input
                type="file"
                ref={inputRef}
                accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
                onChange={imageHandler}
                style={styles.input}
            />
        </View>
    )
}
const styles = StyleSheet.create({

    containerUpload: {
        flexDirection: 'row',
        marginHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#555',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    icon: {
        color: "#aaa",
        marginRight: 10,
    },
    textUpload: {
        color: '#fff',
    },
    input: {
        position: "absolute",
        width: 0,
        height: 0,
    },
})