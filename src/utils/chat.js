export const getConversationId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };
  export const getConversationName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  export const getConversationImage = (user, users) => {
    return users[0]._id === user._id ? users[1].image : users[0].image;
  };
  
  export const checkOnlineStatus = (onlineUsers, user, users) => {
    let convoId = getConversationId(user, users);
    let check = onlineUsers.find((u) => u.studentId === convoId);
    return check ? true : false;
  };