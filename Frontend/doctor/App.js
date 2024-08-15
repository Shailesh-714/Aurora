import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import ChatScreen from "./app/screens/ChatScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from "./app/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/LoginScreen";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync().then(
          () => setAppIsReady(true),
          onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
              setUser(currentuser);
            } else {
              setUser(false);
            }
          })
        );
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView onLayout={onLayoutRootView} style={{ minWidth: "100%" }}>
        {user ? <StackNavigator /> : <LoginScreen />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
