import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../features/studentSlice';
import { PiCameraPlusBold } from 'react-icons/pi';

import { Avatar, Dialog } from 'react-native-elements';
import { useRef } from 'react';
import axios from 'axios';

const cloud_name = 'dcke5pwh4';
const cloud_secret = 'u5jfkkrs';

const Settings = () => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const { token } = student;
  const [focusedInput, setFocusedInput] = useState(null);
  const inputRef = useRef(null);
  const [picture, setPicture] = useState(null);
  const [readablePicture, setReadablePicture] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const handleBlur = (inputName) => {
    setFocusedInput(null);
  };

  const [formUpdated, setFormUpdated] = useState({
    name: '',
    image: '',
    bio: '',
  });



  useEffect(() => {
    if (student) {
      setFormUpdated({
        name: student.name || '',
        image: student.image || '',
        bio: student.bio || '',
      });
    }
  }, [student]);


  const toggleAlert = () => {
    setOpenAlert(!openAlert);
  };
  const updateUser = async () => {
    setLoadingSend(true);
  
    let updatedForm = { ...formUpdated };

    if (picture) {
      const response = await uploadImage();
      // console.log('response', response);
      updatedForm.image = response.secure_url;
    }

    await dispatch(updateStudent({ token, update: updatedForm }));
    setOpenAlert(true);
    setTimeout(() => {
      setLoadingSend(false);
      
    }, 500);
  };

  const imageHandler = async (e) => {
    setLoadingImg(true);
    const files = Array.from(e.nativeEvent.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp"
      ) {
        console.log("formato no aceptado");
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        console.log("es demasiado largo");
        return;
      } else {

        setPicture(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          setReadablePicture(e.target.result);
        };
      }
    });
    setLoadingImg(false);
    // const formData = new FormData();
    // formData.append('upload_preset', cloud_secret);
    // formData.append('file', selectedImage);
    // console.log('formData', formData);
    // const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
    // console.log(data)
    // return data;
  }

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    // console.log('formData', formData);
    // console.log(picture)
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    // console.log(data)
    return data;
  };

  return (

    <View style={styles.container}>

      {!student ?
        <Button loading
          buttonStyle={{
            marginTop: 10,
            backgroundColor: 'transparent',
          }}
        />
        :
        <View style={styles.containerSettings}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Configuración</Text>
          </View>
          <View style={styles.containerInputs}>
            <View>
              <TextInput
                style={[styles.textInput, focusedInput === 'name' && styles.focusedInput]}
                placeholder="Nombre de usuario"
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                placeholderTextColor={focusedInput === 'name' ? '#0040b0' : '#555'}
                onChangeText={(text) => setFormUpdated({ ...formUpdated, name: text })}
                value={formUpdated.name}
              />
            </View>
            <View>
              <TextInput
                style={[styles.textInput, focusedInput === 'bio' && styles.focusedInput]}
                onFocus={() => handleFocus('bio')}
                onBlur={() => handleBlur('bio')}
                placeholder="Bio"
                placeholderTextColor={focusedInput === 'bio' ? '#0040b0' : '#555'}
                onChangeText={(text) => setFormUpdated({ ...formUpdated, bio: text })}
                value={formUpdated.bio}
              />
            </View>
            <Pressable style={styles.imageContainer}>
              <Avatar
                size={100}
                rounded
                source={{ uri: readablePicture || formUpdated.image }}
                containerStyle={{ marginRight: 10, borderWidth: 1.5, borderColor: '#ffcc33' }}
              />
              <Pressable style={styles.iconContainer}>
                {loadingImg ?
                  <Button loading
                    buttonStyle={{
                      marginTop: 10,
                      backgroundColor: 'transparent',
                    }}
                  />
                  :
                  <PiCameraPlusBold size={32} style={{ fill: '#fff' }} />
                }
              </Pressable>

              <input
                type="file"
                name='image'
                ref={inputRef}
                accept="image/png,image/jpeg,image/webp"
                onChange={imageHandler}
                style={styles.inputFile}
              />

            </Pressable>
            <Button disabled={loadingSend ? true : false} title='Guardar cambios' onPress={updateUser} />
            {openAlert &&
              <Dialog
                isVisible={openAlert}
                onBackdropPress={toggleAlert}
              >
                <Dialog.Title title="¡Los cambios fueron realizados con éxito!" />
              </Dialog>
            }
          </View>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSettings: {
    flex: 5,
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderStartColor: '#555',
    borderEndColor: '#555',
  },
  containerTitle: {
    height: 100,
    borderBottomColor: '#555',
    borderWidth: 0.5,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 700,
    margin: 20,
  },
  containerInputs: {
    marginHorizontal: 10,
  },
  textInput: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#555',
    outlineWidth: 0,
    paddingHorizontal: 5,
  },
  focusedInput: {
    borderColor: '#0040b0',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(85, 85, 85, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -26 }, { translateY: -26 }],
  },
  inputFile: {
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0,
    cursor: 'pointer',
    top: '40%',
  }
});

export default Settings;
