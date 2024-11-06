import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProgressBar from "../ProgressBar";
import { Pedometer } from "expo-sensors";

const Steps = () => {
  const [steps, setSteps] = useState(0);
  const goal = 10000;

  const getProgress = (steps) => {
    return Math.min(steps / goal, 1);
  };

  const resetStepsAtMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      setSteps(0);
      resetStepsAtMidnight();
    }, timeUntilMidnight);
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 29) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const startPedometer = async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        try {
          const available = await Pedometer.isAvailableAsync();
          if (available) {
            const subscription = Pedometer.watchStepCount((result) => {
              setSteps(result.steps);
            });
            return () => subscription && subscription.remove();
          } else {
            console.log("Pedometer is not available on this device.");
          }
        } catch (error) {
          console.error("Error starting pedometer:", error);
        }
      } else {
        console.log("Activity recognition permission not granted.");
      }
    };

    startPedometer();
    resetStepsAtMidnight();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.title}>Steps</Text>
        </View>
        <View style={styles.stepRow}>
          <MaterialCommunityIcons
            name="shoe-sneaker"
            size={30}
            color="#F27559"
          />
          <Text style={styles.stepCount}>{steps}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.goalText}>Goal: {goal.toLocaleString()}</Text>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <ProgressBar color={"#F27559"} progress={getProgress(steps)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepRow: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  stepCount: {
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: "500",
  },
  goalText: {
    fontSize: 11,
  },
});

export default Steps;
