import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../screens/ChatScreen";
import AnimTab1 from "./BottomTabs";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import NewUserSetupScreen from "../screens/NewUserSetupScreen";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { setUserInfo, setUsername } = useContext(UserContext);
  const handleNewUser = async () => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { userName, age, gender, weight, height, bmi } = userDoc.data();
        setUsername(userName);
        setUserInfo({
          age: age,
          weight: weight,
          height: height,
          gender: gender,
          bmi: bmi,
        });
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleNewUser();
  }, []);

  const completeNewUserSetup = () => {
    setIsNewUser(false);
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isNewUser ? (
          <Stack.Screen name="NewUserSetup" options={{ headerShown: false }}>
            {() => <NewUserSetupScreen onComplete={completeNewUserSetup} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Main"
            component={AnimTab1}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          component={UserDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
