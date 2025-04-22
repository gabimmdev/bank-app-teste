import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from '../src/routes';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native'; // 👈 Importar aqui

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer> 
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
