import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';

// 🔧 Corrigir a tipagem das rotas incluindo "Dashboard"
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined; // <--- adicionado
};

// Tipagem da prop navigation
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Tipagem das props do componente
interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, user } = useAuth();

  const handleLogin = async () => {
    const success = await login(email, senha);
    if (!success) Alert.alert('Erro', 'Credenciais inválidas');
  };

  useEffect(() => {
    if (user) {
      navigation.replace('Dashboard'); // redireciona para Dashboard se já estiver logado
    }
  }, [user]);

  return (
    <View style={styles.container}>
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
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  registerText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});
