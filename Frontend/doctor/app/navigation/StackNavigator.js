import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../screens/ChatScreen";
import AnimTab1 from "./BottomTabs";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import NewUserSetupScreen from "../screens/NewUserSetupScreen";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const { setUserInfo, setUsername } = useContext(UserContext);

  const handleNewUser = async () => {
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
  };

  useEffect(() => {
    handleNewUser();
  }, []);

  const completeNewUserSetup = () => {
    setIsNewUser(false); // Set to false to show the main app
  };

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
