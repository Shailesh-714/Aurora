import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { AppContext } from "../../context/AppContext";

const ActivitySelector = () => {
  const { activityFactor, setActivityFactor } = useContext(AppContext);
  const activityOptions = ["Light", "Moderate", "Active"];
  const activityFactors = { Light: 1.2, Moderate: 1.55, Active: 1.725 };
  const getDefaultActivity = () => {
    return (
      Object.keys(activityFactors).find(
        (key) => activityFactors[key] === activityFactor
      ) || "Moderate"
    );
  };

  const [activity, setActivity] = useState(getDefaultActivity());
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleClick = (option) => {
    setActivity(option);
    setActivityFactor(activityFactors[option]);
  };

  useEffect(() => {
    if (containerWidth > 0) {
      const index = activityOptions.indexOf(activity);
      const targetX = (containerWidth / activityOptions.length) * index;

      Animated.timing(slideAnim, {
        toValue: targetX,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [activity, containerWidth]);

  useEffect(() => {
    const newActivity = getDefaultActivity();
    setActivity(newActivity);
  }, [activityFactor]);

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Activity Rate</Text>

      <View
        style={styles.container}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
        <Animated.View
          style={[
            styles.highlightBackground,
            {
              width: containerWidth / activityOptions.length,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />
        {activityOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleClick(option)}
          >
            <Text
              style={[
                styles.optionText,
                activity === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ActivitySelector;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    gap: 10,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
  },
  headingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    position: "relative",
    borderRadius: 100,
    width: "100%",
    height: 50,
    alignSelf: "center",
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  optionText: {
    color: "black",
    fontWeight: "bold",
  },
  selectedText: {
    color: "white",
  },
  highlightBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#F14C6E",
    zIndex: -1,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
});
