import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ message, setMessage }) => {
  return (
    <View style={styles.container}>
      {/* Message input */}
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
};

export default Input;
