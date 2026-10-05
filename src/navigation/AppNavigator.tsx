import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddTransactionScreen } from '../screens/AddTransactionScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: '#1e1e1e' },
          headerTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#1e1e1e', borderTopColor: '#333' },
          tabBarActiveTintColor: '#4caf50',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Add Expense" component={AddTransactionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
