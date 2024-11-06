import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AppProvider } from "./app/context/AppContext";
import { ToastBarProvider } from "./app/context/ToastBarContext";
import { CaloryProvider } from "./app/context/CaloryContext";
import * as Notifications from "expo-notifications";
import { UserProvider } from "./app/context/UserContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission for notifications is required to receive reminders.");
  }
};
const { width, height } = Dimensions.get("window");
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
  useEffect(() => {
    requestPermissions();
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
      <UserProvider>
        <AppProvider>
          <ToastBarProvider>
            <CaloryProvider>
              <View
                onLayout={onLayoutRootView}
                style={{
                  flex: 1,
                  minHeight: height,
                }}
              >
                <StatusBar
                  barStyle="light-content"
                  translucent={true}
                  backgroundColor="transparent"
                />
                {user ? <StackNavigator /> : <LoginScreen />}
              </View>
            </CaloryProvider>
          </ToastBarProvider>
        </AppProvider>
      </UserProvider>
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
