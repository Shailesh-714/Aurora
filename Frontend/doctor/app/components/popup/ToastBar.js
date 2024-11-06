import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const ToastBar = ({ header, message, duration, onDismiss, color }) => {
  const progress = useRef(new Animated.Value(1)).current; // Starts with full width

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 0, // Shrink the progress bar to zero width
      duration: duration,
      useNativeDriver: false,
    }).start(() => onDismiss()); // Call onDismiss after animation finishes
  }, [duration, onDismiss]);

  return (
    <View style={styles.ToastBarContainer}>
      <Text style={styles.messageHeader}>{header}</Text>
      <Text style={styles.messageText}>{message}</Text>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"], // Decrease the width over time
            }),
          },
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

// Styles for the Toast Bar
const styles = StyleSheet.create({
  ToastBarContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    gap: 5,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 1000,
    overflow: "hidden",
    elevation: 5,
  },
  messageHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 15,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3.5,
    opacity: 0.6,
    marginTop: 5,
  },
});
export default ToastBar;
