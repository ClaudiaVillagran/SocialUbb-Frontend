
import { Video, ResizeMode } from 'expo-av';
import { useRef, useState } from "react";
import { FaCirclePause } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";

import { View, StyleSheet, Button, Image, Pressable } from 'react-native';



const FileImageVideo = ({ url, type }) => {
    // console.log(url)
    const video = useRef(null);
    const [status, setStatus] = useState({});
    return (
        <View style={styles.container}>
            {type === "IMAGE" ? (
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={{ uri: (url) }} />

                </View>
            ) : (
                <View style={styles.containerVideo}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: (url),
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    <View style={styles.buttons}>
                        <Pressable
                            onPress={() =>
                                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                            }
                        >
                            {status.isPlaying ? <FaCirclePause size={32} style={{fill: '#222aa8'}}/> : <FaCirclePlay size={32} style={{fill: '#222aa8'}} />}
                        </Pressable>

                    </View>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 'auto',
        minHeight: 300,
    },
    containerVideo: {
        width: 'auto',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        alignSelf: 'center',
        width: 'auto',
        height: '100%'
    },
    buttons: {
        position: 'absolute',
        alignSelf: 'center',
    },
    containerImage: {
        width: 'auto',
        height: '100%'
    },
    image: {
        width: 'auto',
        height: '100%',
        resizeMode: 'cover',
    },
    video: {
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
    },
});
export default FileImageVideo