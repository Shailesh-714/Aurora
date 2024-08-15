import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <SafeAreaView
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
        }}
      >
        {user ? <StackNavigator /> : <LoginScreen />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020121",
    alignItems: "center",
    justifyContent: "center",
  },
});
