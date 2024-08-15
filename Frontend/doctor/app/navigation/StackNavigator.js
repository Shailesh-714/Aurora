import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import AnimTab1 from "./BottomTabs"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../screens/ChatScreen";
const { width } = Dimensions.get("window");

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={AnimTab1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
