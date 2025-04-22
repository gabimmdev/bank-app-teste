import React, { useEffect, useState, useCallback } from 'react';
import { View,Text,FlatList,StyleSheet,RefreshControl,Button,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Transaction = {
  id: string;
  date: string;
  description: string;
  value: number;
  type: 'credit' | 'debit';
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<Nav>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem('transactions');
    if (data) setTransactions(JSON.parse(data));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  }, []);

  const creditTotal = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.value, 0);

  const debitTotal = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.value, 0);

  const saldo = creditTotal - debitTotal;

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text
        style={[
          styles.value,
          item.type === 'credit' ? styles.credit : styles.debit,
        ]}
      >
        R$ {item.value.toFixed(2)}
      </Text>
      <View style={styles.iconText}>
        <View style={{ marginRight: 8 }}>
        <MaterialCommunityIcons>
        name={item.type === 'credit' ? 'arrow-down-bold-circle' : 'arrow-up-bold-circle'}
        size={24}
        color={item.type === 'credit' ? 'green' : 'red'}
      </MaterialCommunityIcons>
      </View>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Olá, {user?.name}</Text>

      <View style={styles.card}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>R$ {saldo.toFixed(2)}</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.credit}>Entradas: R$ {creditTotal.toFixed(2)}</Text>
          <Text style={styles.debit}>Saídas: R$ {debitTotal.toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={styles.empty}>Sem transações</Text>}
      />

      <Button title="Nova Transação" onPress={() => navigation.navigate('Transition')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Button title="Sair" color="red" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#f9f9f9' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  balanceLabel: { fontSize: 16, color: '#666' },
  balanceValue: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: { flex: 1 },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#777' },
  value: { fontSize: 16, fontWeight: 'bold' },
  credit: { color: 'green' },
  debit: { color: 'red' },
  empty: { textAlign: 'center', marginTop: 32, color: '#999' 
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});
