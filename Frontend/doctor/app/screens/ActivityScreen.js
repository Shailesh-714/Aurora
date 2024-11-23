import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityBg from "../assets/images/backgrounds/appScreenBg/activity.jpg";

const { height } = Dimensions.get("window");

const ActivityScreen = () => {
  const suggestions = [
    {
      title: "Hydration Reminder",
      suggestion:
        "Drink a glass of water now to keep your energy up and stay refreshed.",
      timestamp: "10:00 AM",
    },
    {
      title: "Snack Time",
      suggestion: "Fuel your body with a small, healthy snack.",
      timestamp: "11:30 AM",
    },
    {
      title: "Stretch Reminder",
      suggestion:
        "Loosen up your muscles, improve your posture, and feel revitalized.",
      timestamp: "1:00 PM",
    },
    {
      title: "Walk Reminder",
      suggestion: "Step away from your desk for a short 5-minute walk.",
      timestamp: "3:00 PM",
    },
    {
      title: "Sleep Reminder",
      suggestion: "Turn off screens and relax to ensure a peaceful sleep.",
      timestamp: "9:00 PM",
    },
    {
      title: "Deep Breathing",
      suggestion:
        "Pause for a minute and take five deep breaths, can reduce stress and boost mental clarity.",
      timestamp: "4:00 PM",
    },
    {
      title: "Eye Strain Relief",
      suggestion:
        "Look away from your screen and focus on a distant object for 20 seconds to give your eyes a break.",
      timestamp: "12:00 PM",
    },
  ];

  return (
    <ImageBackground style={{ flex: 1 }} source={ActivityBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Health Reminders" titleColor="#F14C6E" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {suggestions.map((item, index) => (
            <View key={index} style={styles.notificationItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.suggestion}>{item.suggestion}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          ))}
          <View
            style={{
              backgroundColor: "transparent",
              borderRadius: 20,
              padding: 60,
            }}
          />
        </ScrollView>
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
  notificationItem: {
    backgroundColor: "#fff",
    padding: 15,
    paddingBottom: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  suggestion: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey",
    marginTop: 5,
  },
  timestamp: {
    position: "absolute",
    bottom: "10%",
    right: "4%",
    fontSize: 10,
    marginTop: 5,
    fontWeight: "500",
    alignSelf: "flex-end",
  },
  noSuggestions: {
    alignItems: "center",
    marginTop: height * 0.35,
    flex: 1,
    justifyContent: "center",
  },
  noSuggestionsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
