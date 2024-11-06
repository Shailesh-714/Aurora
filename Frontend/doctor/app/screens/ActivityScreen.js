import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityBg from "../assets/images/backgrounds/appScreenBg/activity.jpg";

const { height, width } = Dimensions.get("window");

const healthReminders = [
  {
    id: "1",
    title: "Hydration Reminder",
    description: "Drink a glass of water.",
  },
  {
    id: "2",
    title: "Exercise Reminder",
    description: "Take a 5-minute stretch break.",
  },
  {
    id: "3",
    title: "Sleep Reminder",
    description: "Consider winding down for better sleep.",
  },
  {
    id: "4",
    title: "Mindfulness Reminder",
    description: "Take a few deep breaths.",
  },
  {
    id: "5",
    title: "Posture Check",
    description: "Check your posture to avoid strain.",
  },
  {
    id: "6",
    title: "Snack Reminder",
    description: "Grab a healthy snack if you’re hungry.",
  },
  {
    id: "7",
    title: "Eye Care",
    description: "Rest your eyes from screen time for a minute.",
  },
];

// Schedule one notification each hour with a random reminder
const scheduleHourlyNotification = async () => {
  const isScheduled = await AsyncStorage.getItem("hourlyNotificationScheduled");

  if (isScheduled === null) {
    let lastIndex = JSON.parse(
      (await AsyncStorage.getItem("lastReminderIndex")) || "0"
    );

    const scheduleNextNotification = async () => {
      // Get the next reminder in sequence
      const nextReminder = healthReminders[lastIndex];

      await Notifications.scheduleNotificationAsync({
        content: {
          title: nextReminder.title,
          body: nextReminder.description,
        },
        trigger: {
          seconds: 3600, // Trigger every hour
          repeats: true,
        },
      });

      // Update the last index for the next notification
      lastIndex = (lastIndex + 1) % healthReminders.length;
      await AsyncStorage.setItem(
        "lastReminderIndex",
        JSON.stringify(lastIndex)
      );
    };

    // Schedule the first notification and set up repeated notifications
    await scheduleNextNotification();
    await AsyncStorage.setItem("hourlyNotificationScheduled", "true");
  }
};

// Log notifications to AsyncStorage and update displayed notifications
const handleNotificationReceived = async (notification) => {
  const notificationLog = JSON.parse(
    (await AsyncStorage.getItem("notificationLog")) || "[]"
  );

  const newNotification = {
    id: notification.request.identifier,
    title: notification.request.content.title,
    description: notification.request.content.body,
    timestamp: new Date().toLocaleString(),
  };

  notificationLog.push(newNotification);
  await AsyncStorage.setItem(
    "notificationLog",
    JSON.stringify(notificationLog)
  );
};

const ActivityScreen = () => {
  const [displayedNotifications, setDisplayedNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedNotifications = JSON.parse(
        (await AsyncStorage.getItem("notificationLog")) || "[]"
      );
      setDisplayedNotifications(storedNotifications);
    };

    // Schedule the notifications and listen for received notifications
    scheduleHourlyNotification();
    fetchNotifications();

    const subscription = Notifications.addNotificationReceivedListener(
      handleNotificationReceived
    );

    return () => subscription.remove();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground style={{ flex: 1 }} source={ActivityBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Health Reminders" titleColor="#F14C6E" />
        <FlatList
          data={displayedNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </ImageBackground>
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
    paddingHorizontal: width * 0.04,
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
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
