import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import AnimTab1 from "./BottomTabs"; // Adjust the path as necessary
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const {width} = Dimensions.get("window");

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (<View style={{...Platform.select({android:{paddingTop:width*0.025}})}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={AnimTab1}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer></View>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
