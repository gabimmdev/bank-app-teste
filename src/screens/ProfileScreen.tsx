import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Nome não pode ser vazio');
      return;
    }

    updateUser({ name });
    Alert.alert('Sucesso', 'Perfil atualizado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Button title="Salvar" onPress={handleSave} />
      <View style={styles.spacer} />
      <Button title="Sair" onPress={logout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  email: { marginBottom: 16, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 24,
    padding: 12,
    borderRadius: 8,
    fontSize: 16
  },
  spacer: { height: 20 }
});
