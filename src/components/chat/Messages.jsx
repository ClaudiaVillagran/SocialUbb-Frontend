import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Aside from "../pages/Aside";
import SocketContext from '../../context/SocketContext';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import Search from "./search/Search";
import SearchResults from "./search/SearchResults";
import AllConversationsWithSocket from "./conversations/AllConversations";
import { getConversationMessages } from "../../features/chatSlice";
import ChatHeaderWithSocket from "./conversations/ChatHeader";
import ChatMessages from "./conversations/ChatMessages";
import { checkOnlineStatus } from "../../utils/chat";
import ChatActions from './conversations/actions/ChatActions';

import FilesPreview from "./preview/files/FilesPreview";

const Messages = ({ socket, onlineStudents }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const { token, image } = student;
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  //typing
  const [typing, setTyping] = useState(false);

  const [openChat, setOpenChat] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  // console.log('searchResult MESSAGES CONTAINER', searchResults)
  const { activeConversation, messages, files } = useSelector((state) => state.chat);

  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);



  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#222428' }}>
          <Avatar size={32} containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }} rounded source={{ uri: (image) }} />
          <Text style={{ color: '#fff', fontWeight: 700 }}>TUS CONVERSACIONES</Text>
        </View>
        {/* <Pressable style={styles.buttonCrear} onPress={() => setShowCreateGroup(true)}>
          <Text style={{ color: '#fff' }}>Crear grupo</Text>
        </Pressable> */}
        {/* {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
        )} */}
        <Search
          searchLength={searchResults.length}
          setSearchResults={setSearchResults}
        />

        {searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} />
        ) : (
          <AllConversationsWithSocket typing={typing} />
        )}
      </View>
      <View style={styles.containerRigth}>
        {activeConversation._id ?
          <>
            <ChatHeaderWithSocket onlineStudents={onlineStudents}
              online={activeConversation.isGroup
                ? false
                : checkOnlineStatus(onlineStudents, student, activeConversation.students)}
            />
            {files.length > 0 ? (
              <FilesPreview />
            ) : (
              <>
                {/*Chat messages*/}
                <ScrollView>
                  <ChatMessages typing={typing} />
                </ScrollView>
                {/* Chat Actions */}
                <ChatActions />
              </>
            )}
          </>
          :
          <View style={styles.bienvenida}>
            <Text style={{ color: '#fff', fontSize: 30 }}>Bienvenido a SocialUbb</Text>
            <Text style={{ color: '#fff', fontStyle: 'italic' }}>Explora, conecta y comparte momentos inolvidables con nuestra comunidad.</Text>
          </View>
        }
      </View>
      {/* <Aside/> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    flexDirection: "row", // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000',
    paddingTop: 10

  },
  containerProfile: {
    flex: 2, // Establecer flex: 1 para que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderStartColor: '#555',
    borderEndColor: '#555',
    paddingLeft: 10
  },
  containerRigth: {
    flex: 4,
    borderWidth: 0.5,
    height: '100%',
    borderEndColor: '#555',
  },
  bienvenida: {
    height: '100%',
    backgroundColor: '#222428',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCrear: {
    backgroundColor: '#222428',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',

  }
});

const MessagesWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Messages {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default MessagesWithSocket;
