import { Pressable, StyleSheet, Text, View } from "react-native";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";

import { FaRegHeart } from "react-icons/fa";
const icons = ['likes', 'comments']

const Actions = () => {
    const { student } = useSelector((state) => state.student);
    return (
        <View style={styles.container}>
            {icons.map(icon => (
                <View key={icon} style={styles.container}>
                    {icon === 'likes' && <FaRegHeart size={15} style={styles.icon} />}
                    {icon === 'comments' && <FaRegComment size={15} style={styles.icon} />}
                </View>
            ))}
             {/* {pub.likes.includes(student._id)
                            ? (
                                <Pressable onPress={handleDislike}>
                                  <FcLike  size={15} style={styles.icon}/>
                                </Pressable>
                            ) :
                            <Pressable onPress={handleLike}>
                                <FaRegHeart size={15} style={styles.icon} />
                            </Pressable>
                        } */}
        </View>
    );
}
const styles = StyleSheet.create({
    icon: {
        color: "#999",
        marginRight: 10,
    },
    container: {
        flexDirection: 'row',
         marginTop: 5,
        marginLeft: 5,
    }
});
export default Actions;