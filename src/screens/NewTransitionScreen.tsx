import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined; 
};

export default function NovaTransacaoScreen() {
  const [emailDestinatario, setEmailDestinatario] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const handleEnviar = async () => {
    const valorNumerico = parseFloat(valor);

    useEffect(() => {
        if (user) {
          navigation.replace('Dashboard'); // redireciona para Dashboard se já estiver logado
        }
      }, [user]);

    if (!emailDestinatario || !descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const novaTransacao = {
      id: uuidv4(),
      date: new Date().toISOString(),
      description: descricao,
      value: valorNumerico,
      type: 'debit'
    };

    const data = await AsyncStorage.getItem('transactions');
    const transacoes = data ? JSON.parse(data) : [];

    transacoes.push(novaTransacao);
    await AsyncStorage.setItem('transactions', JSON.stringify(transacoes));

    Alert.alert('Sucesso', 'Transação enviada!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email do destinatário"
        value={emailDestinatario}
        onChangeText={setEmailDestinatario}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }
});
