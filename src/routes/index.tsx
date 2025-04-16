import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
  {user ? (
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  ) : (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </>
  )}
</Stack.Navigator>
    </NavigationContainer>
  );
}