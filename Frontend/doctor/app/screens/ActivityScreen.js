import React, { useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityBg from "../assets/images/backgrounds/appScreenBg/activity.jpg";
import { AppContext } from "../context/AppContext";
import { auth } from "../../firebaseConfig";

const { height } = Dimensions.get("window");

const ActivityScreen = () => {
  const {
    water,
    waterNeed,
    exerciseHealth,
    foodHealth,
    sleep,
    healthScore,
    skinHealth,
    mentalHealth,
  } = useContext(AppContext);

  const [suggestions, setSuggestions] = useState([]);
  const [lastGeneratedTimes, setLastGeneratedTimes] = useState({});

  const SUGGESTIONS_KEY = `${auth.currentUser.uid}suggestions`;
  const TIMES_KEY = "lastGeneratedTimes";

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions));
      await AsyncStorage.setItem(TIMES_KEY, JSON.stringify(lastGeneratedTimes));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const loadData = async () => {
    try {
      const storedSuggestions = await AsyncStorage.getItem(SUGGESTIONS_KEY);
      const storedTimes = await AsyncStorage.getItem(TIMES_KEY);

      if (storedSuggestions) setSuggestions(JSON.parse(storedSuggestions));
      if (storedTimes) setLastGeneratedTimes(JSON.parse(storedTimes));
    } catch (error) {
      console.error("Error loading data from AsyncStorage:", error);
    }
  };

  const updateSuggestions = () => {
    const newSuggestions = [];
    const currentTime = new Date();
    const hours = currentTime.getHours();

    const addSuggestion = (key, title, suggestion) => {
      const lastGenerated = lastGeneratedTimes[key];
      const timeDiff = lastGenerated
        ? (currentTime - new Date(lastGenerated)) / (1000 * 60 * 60)
        : Infinity;

      if (timeDiff >= 2) {
        newSuggestions.push({
          title,
          suggestion,
          timestamp: currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        setLastGeneratedTimes((prev) => ({ ...prev, [key]: currentTime }));
      }
    };

    const waterProgress = (water / waterNeed) * 100;
    if (hours >= 8 && hours <= 20) {
      if (waterProgress < 50) {
        addSuggestion(
          "hydration",
          "Hydration Reminder",
          "Stay hydrated! Drink more water to reach your daily goal."
        );
      } else if (waterProgress < 100) {
        addSuggestion(
          "hydration",
          "Hydration Progress",
          "Great job on drinking water! Keep it up."
        );
      } else {
        addSuggestion(
          "hydration",
          "Hydration Goal Met",
          "You’ve met your water intake goal for today! Good job!"
        );
      }
    }

    // Check exercise
    if ((hours >= 6 && hours <= 10) || (hours >= 17 && hours <= 20)) {
      if (exerciseHealth < 0.5) {
        addSuggestion(
          "exercise",
          "Exercise Reminder",
          "It's a good time for some exercise. A quick walk or stretch can help."
        );
      } else if (exerciseHealth < 0.8) {
        addSuggestion(
          "exercise",
          "Keep Exercising",
          "Keep up the great work with your exercise!"
        );
      } else {
        addSuggestion(
          "exercise",
          "Exercise Goal Met",
          "You've met your exercise goals! Consider some light stretching."
        );
      }
    }

    // Nutrition
    if (foodHealth < 0.5) {
      addSuggestion(
        "nutrition",
        "Nutrition Reminder",
        "Consider having a healthy snack to meet your nutrition needs."
      );
    } else if (foodHealth < 0.8) {
      addSuggestion(
        "nutrition",
        "Nutrition Progress",
        "You're on track with your food intake. Keep choosing nutritious options."
      );
    } else {
      addSuggestion(
        "nutrition",
        "Nutrition Goal Met",
        "Excellent nutrition today! You’re meeting your dietary goals."
      );
    }

    // Sleep
    if (hours >= 20) {
      if (sleep < 6) {
        addSuggestion(
          "sleep",
          "Sleep Reminder",
          "Consider getting some rest soon for a full night's sleep."
        );
      } else if (sleep < 8) {
        addSuggestion(
          "sleep",
          "Sleep Progress",
          "You're doing well with your sleep, but aim for a bit more rest."
        );
      } else {
        addSuggestion(
          "sleep",
          "Sleep Goal Met",
          "You're well-rested. Keep up the great sleep hygiene!"
        );
      }
    }

    // Health Score
    if (healthScore < 0.5) {
      addSuggestion(
        "healthScore",
        "Health Score Improvement",
        "Let’s focus on meeting a few more goals today to boost your health score."
      );
    } else if (healthScore < 0.8) {
      addSuggestion(
        "healthScore",
        "Great Health Score",
        "You're doing well! Keep building on your healthy habits."
      );
    } else {
      addSuggestion(
        "healthScore",
        "Health Goal Achieved",
        "Amazing! You're hitting all your health goals today."
      );
    }

    setSuggestions((prevSuggestions) =>
      newSuggestions.length > 0 ? newSuggestions : prevSuggestions
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateSuggestions();
    saveData();
  }, [
    water,
    exerciseHealth,
    foodHealth,
    sleep,
    healthScore,
    skinHealth,
    mentalHealth,
  ]);

  return (
    <ImageBackground style={{ flex: 1 }} source={ActivityBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Health Reminders" titleColor="#F14C6E" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <View key={index} style={styles.notificationItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.suggestion}>{item.suggestion}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noSuggestions}>
              <Text style={styles.noSuggestionsText}>No suggestions yet!</Text>
            </View>
          )}
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
    color: "#666",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
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
