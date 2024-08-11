import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "./app/screens/ChatScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from "./app/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={{ minWidth: "100%" }}>
        <StackNavigator />
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
