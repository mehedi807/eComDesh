import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/pages/Dashboard'
import Order from './src/pages/Order'
import Product from './src/pages/Product'
import Cost from './src/pages/Cost'
import Setting from './src/pages/Setting'
import Login from './src/pages/Login'
import Signup from './src/pages/Signup'

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Cost" component={Cost} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
