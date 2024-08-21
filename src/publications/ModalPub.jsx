import { Dialog } from '@rneui/themed';
import { Pressable, StyleSheet, Text, TextInput, View, Alert, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { Input } from '@rneui/themed';

// Import DatePicker for web
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import DateTimePicker for native
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputImage } from '../components/inputs/InputImage';
import { saveProject } from '../features/projectSlice';
import { uploadProjectFile } from '../utils/uploadProjectFile';

const ModalPub = ({ openModal, setOpenModal, setNewPost }) => {
    const toggleDialog1 = () => {
        setOpenModal(!openModal);
    };
    const [dateSelected, setDateSelected] = useState(false);


    const dispatch = useDispatch();

    const { student } = useSelector((state) => state.student);
    const { token } = student;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [place, setPlace] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);
    const [fileProject, setFileProject] = useState('')

    const handlePublish = async () => {

        if (title.length <= 3 || description.length <= 3) {
            setErrorForm(true)

            return;
        }
        setLoadingForm(true)
        // Aquí iría la lógica para enviar la publicación al servidor
        if (fileProject.length > 0) {
            const uploadedFiles = await uploadProjectFile(fileProject);
            // console.log(uploadedFiles)
        }



        dispatch(saveProject({ title, description, date, place, file: fileProject.length > 0 ? uploadedFiles : [], token }));
        setOpenModal(false);

        setNewPost((prev) => !prev);
        // Lógica para limpiar los campos del formulario
        setTitle('');
        setDescription('');
        setDate(new Date());
        setPlace('');
        setFileProject('');
        setTimeout(() => {
            setLoadingForm(false);
        }, 500);
        navigation.navigate('ProyectStudent');


    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setDateSelected(true);
    };


    return (
        <View >
            <Dialog
                isVisible={openModal}
                onBackdropPress={toggleDialog1}
                overlayStyle={styles.containerView}
            >
                {/* <Avatar size={50}
                        rounded
                        source={{ uri: `${student.image}` }}
                        containerStyle={{ marginRight: 10, borderWidth: 0.5, borderColor: '#ffcc33' }}
                    /> */}
                <View style={styles.containerDataPub} >

                    <Input
                        placeholder='Título'
                        style={styles.textInput}
                        value={title}
                        onChangeText={setTitle}
                        errorStyle={{ color: 'red' }}
                        errorMessage={title.length <= 3 ? 'Ingrese un título por favor' : ''}
                    />

                    <Input
                        placeholder='Lugar'
                        style={styles.textInput}
                        value={place}
                        onChangeText={setPlace}
                    />

                    <Input
                        placeholder='Descripción'
                        style={[styles.textInput, styles.description]}
                        value={description}
                        onChangeText={setDescription}
                        errorStyle={{ color: 'red' }}
                        errorMessage={description.length <= 3 ? 'Ingrese una descripción por favor' : ''}
                        multiline={true}
                    />
                    {Platform.OS === 'web' ? (
                        <DatePicker
                            selected={dateSelected ? date : null}
                            onChange={(date) => {
                                setDate(date);
                                setDateSelected(true);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Fecha"
                            customInput={
                                <Input
                                    style={[styles.textInput]}
                                    value={dateSelected ? date.toLocaleDateString() : ''}
                                    placeholder="Fecha"
                                    editable={false}
                                />
                            }
                        />
                    ) : (
                        <>
                            <Pressable onPress={() => setShowDatePicker(true)}>
                                <Input
                                    style={styles.textInput}
                                    value={dateSelected ? date.toLocaleDateString() : ''}
                                    placeholder="Fecha"
                                    placeholderTextColor="#999"
                                    editable={false}
                                />
                            </Pressable>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                        </>
                    )}

                    <View>


                        {fileProject ? (
                            Platform.OS === 'web' ? (
                                <img src={fileProject.fileData} alt="Uploaded" style={styles.image} />
                            ) : (
                                <Image
                                    source={{ uri: fileProject }}
                                    style={styles.image}
                                />
                            )
                        ) : null}
                        <InputImage setFileProject={setFileProject} />
                    </View>
                    {errorForm &&
                        <Text style={styles.errorText}>Debe completar los campos título y descripción</Text>
                    }
                    {loadingForm &&
                        <Text style={styles.loadingText} >Cargando...</Text>
                    }
                    <Pressable style={styles.containerButton} onPress={handlePublish}>
                        <Text style={styles.text}>PUBLICAR</Text>
                    </Pressable>
                </View>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        backgroundColor: '#343640',
        borderBlockColor: '#555',
        height: 'auto',
        width: 'auto',
        padding: 10,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        color: '#ccc',
        fontSize: 20,
        outlineWidth: 0,
        justifyContent: 'center',
        verticalAlign: 'center',
    },
    description: {
        height: 100,
    },
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
    textUpload: {
        color: '#fff',
    },
    text: {
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
    },
    containerButton: {
        backgroundColor: '#0040b0',
        paddingBlock: 10,
        paddingHorizontal: 40,
        marginRight: 10,
    },
    icon: {
        color: "#aaa",
        marginRight: 10,
    },
    containerDataPub: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },

    image: {
        width: 200,
        height: 200,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 12,
    },
    loadingText: {
        color: "blue",
        marginBottom: 10,
        fontSize: 12,
    }
});

export default ModalPub;
