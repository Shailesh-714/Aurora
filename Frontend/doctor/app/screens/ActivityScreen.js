import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const notifications = [
  {
    id: "1",
    title: "New message from John",
    description: "Hey, let’s catch up tomorrow at 10 AM.",
  },
  {
    id: "2",
    title: "App Update",
    description: "Version 2.0 is now available with new features!",
  },
  {
    id: "3",
    title: "Reminder",
    description: "Your subscription will expire in 3 days.",
  },
  {
    id: "4",
    title: "Promotion",
    description: "Get 20% off on your next order!",
  },
  {
    id: "5",
    title: "Security Alert",
    description: "Login detected from a new device.",
  },
];

const ActivityScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#F14C6E", "white"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <MyHeader title="Notifications" titleColor="#F14C6E" />
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  list: {
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  notificationItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
