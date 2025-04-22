import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewTransitionScreen from '../screens/NewTransitionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Transition" component={NewTransitionScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen}/>
      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
    </Stack.Navigator>
  );
}