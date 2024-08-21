import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Video, ResizeMode } from 'expo-av';
import { useState } from "react";

const FileViewer = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);
  // console.log(files)
  // console.log(activeIndex)

  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      {files[activeIndex].type === "IMAGE" ? (
        <Image
          source={{ uri: files[activeIndex].fileData }}
          style={styles.image}
        />
      ) : files[activeIndex].type === "VIDEO" ? (
        <Video
          source={{ uri: files[activeIndex].fileData }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      ) : (
        <View style={styles.fileContainer}>
          {/* File Icon Image */}
          <Image
            source={{ uri: `../../../../images/files/${files[activeIndex].type}.png` }}
            style={styles.fileIcon}
          />
          {/* No preview text */}
          <Text style={styles.noPreviewText}>
            No preview available
          </Text>
          {/* File size / type */}
          <Text style={styles.fileInfo}>
            {files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  video: {
    width: 200,
    height: 200,
  },
  fileContainer: {
    alignItems: 'center',
  },
  fileIcon: {
    width: 50,
    height: 50,
  },
  noPreviewText: {
    fontSize: 16,
    marginTop: 10,
    color: '#ccc',
  },
  fileInfo: {
    fontSize: 14,
    marginTop: 5,
    color: '#ccc',
  },
});

export default FileViewer;
