import { StyleSheet, View } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAppIsReady(true); 
    });
    return () => unsubscribeAuth();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
        }}>
        {user ? <StackNavigator /> : <LoginScreen />}
      </View>
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
