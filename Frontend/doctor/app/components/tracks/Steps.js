import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProgressBar from "../ProgressBar"; // Import your custom progress bar
import { Pedometer } from "expo-sensors"; // Import Pedometer for step tracking

const Steps = () => {
  const [steps, setSteps] = useState(0);
  const goal = 10000; // Set your step goal

  // Function to calculate progress based on steps taken
  const getProgress = (steps) => {
    return Math.min(steps / goal, 1); // Ensures the progress doesn't exceed 1 (100%)
  };

  // Reset steps at midnight (12 AM)
  const resetStepsAtMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // Set to the next midnight

    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      setSteps(0); // Reset steps at midnight
      resetStepsAtMidnight(); // Recursively reset every day at midnight
    }, timeUntilMidnight);
  };

  useEffect(() => {
    const startPedometer = async () => {
      try {
        const available = await Pedometer.isAvailableAsync(); // Check for availability
        if (available) {
          const subscription = Pedometer.watchStepCount((result) => {
            setSteps(result.steps); // Update the step count dynamically
          });
          return () => subscription && subscription.remove(); // Clean up the subscription
        } else {
          console.log("Pedometer is not available on this device.");
        }
      } catch (error) {
        console.error("Error starting pedometer:", error);
      }
    };

    startPedometer();
    resetStepsAtMidnight(); // Start resetting steps at midnight
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        flex: 1,
      }}
    >
      <View>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Steps</Text>
        </View>
        <View
          style={{
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="shoe-sneaker"
            size={30}
            color="#F27559"
          />
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 17,
              fontWeight: "500",
            }}
          >
            {steps} {/* Display the steps dynamically */}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 11 }}>Goal: {goal.toLocaleString()}</Text>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          {/* Use your ProgressBar component */}
          <ProgressBar color={"#F27559"} progress={getProgress(steps)} />
        </View>
      </View>
    </View>
  );
};

export default Steps;
