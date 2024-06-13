import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation, Octicons } from '@expo/vector-icons';
import LoginScreen from '../auth/LoginScreen';

function BottomTabs(){
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={LoginScreen}
          options={{
            tabBarLabel: "Home",
            tabBarActiveTintColor: "#FF7043",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              position: "relative",
              top: -4,
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => 
              focused ? (
                <Foundation name="home" size={26} color="#FF7043" />
              ) : (
                <Octicons name="home" size={22} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})