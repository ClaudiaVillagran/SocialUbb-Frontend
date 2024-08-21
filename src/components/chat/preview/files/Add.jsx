import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../features/chatSlice';
import { getFileType } from '../../../../utils/file';
import { IoMdAdd } from "react-icons/io";

const Add = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const filestHandler = (e) => {
    let files = Array.from(e.nativeEvent.target.files);
    files.forEach((file) => {
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'text/plain' &&
        file.type !== 'application/msword' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        file.type !== 'application/vnd.ms-powerpoint' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/vnd.ms-excel' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.rar' &&
        file.type !== 'application/zip' &&
        file.type !== 'audio/mpeg' &&
        file.type !== 'audio/wav' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg' &&
        file.type !== 'image/webm' &&
        file.type !== 'image/webp'
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: getFileType(file.type) === 'IMAGE' ? e.target.result : '',
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => inputRef.current.click()}>
        <View style={styles.container}>
        <IoMdAdd />
        </View>
      </TouchableOpacity>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
        onChange={filestHandler}
      />
    </View>
  );
};

const styles = {
  container: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    width: 20,
    height: 20,
  },
};

export default Add;
