import React, { useState, useRef } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/file";
import { MdInsertPhoto } from "react-icons/md";

const PhotoAttachment = () => {
  const dispatch = useDispatch();
  const [tooLong, setTooLong] = useState(false);
  const inputRef = useRef(null);

  const imageHandler = (e) => {
    const files = Array.from(e.nativeEvent.target.files);

    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "image/webm" &&
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
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  function mostrarAlerta() {
    alert("El video es muy pesado");
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => inputRef.current.click()} style={styles.icon}>
        <MdInsertPhoto style={{ fill: '#ccc' }} />
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
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    position: "absolute",
    width: 0,
    height: 0,
  },
});


export default PhotoAttachment;
