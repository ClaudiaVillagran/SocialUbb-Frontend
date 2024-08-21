import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native'; // Importa el componente Text de react-native
import { io } from 'socket.io-client';
import PrivateLayout from './src/components/layout/private/PrivateLayout';
import { useSelector } from "react-redux";
import PublicLayout from "./src/components/layout/public/PublicLayout";

import SocketContext from './src/context/SocketContext';

const socket = io('http://localhost:3000')
export default function Main() {
    const { student } = useSelector((state) => state.student);
    const { token } = student;
    const [isConnected, setIsConnected] = useState(false); // Inicializa isConnected en false

    //console.log(student)
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true); // Actualiza isConnected a true cuando se conecta el socket
            console.log('Socket connected!');
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Socket disconnected!');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);
    return (

        <NavigationContainer>

            <SocketContext.Provider value={socket}>
                {token ?
                    <PrivateLayout socket={socket} /> : <PublicLayout />}
                {console.log(isConnected ? 'Conectado' : 'No conectado')}
            </SocketContext.Provider>
        </NavigationContainer>
    );
}
