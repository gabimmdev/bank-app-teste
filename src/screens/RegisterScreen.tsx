import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext'; 

// definição dos tipos de navegação
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { user } = useAuth(); 
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (user) {
      navigation.replace('Dashboard');
    }
  }, [user]);

  const handleRegister = async () => {
    if (!name || !document || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const newUser = { name, document, email, senha };

    try {
      await AsyncStorage.setItem('registeredUser', JSON.stringify(newUser));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Erro ao salvar dados');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Nome" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Documento" 
        value={document} 
        onChangeText={setDocument} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Senha" 
        value={senha} 
        onChangeText={setSenha} 
        style={styles.input} 
        secureTextEntry 
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center' 
  },
  input: { 
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 8, 
    borderRadius: 4 
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'blue',
    textAlign: 'center',
  },
});
