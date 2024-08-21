
import { Provider } from 'react-redux';
import {store} from './src/app/store'; // Ajusta la importación del store si es necesario

import Main from "./Main";
import { Text } from 'react-native';

export default function App() {
  console.log('first')

  return (
    <Provider store={store}>
      <Main/>
   
    </Provider>
  );
}
