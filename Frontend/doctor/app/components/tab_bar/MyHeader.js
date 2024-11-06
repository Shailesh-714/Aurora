import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons

const { height, width } = Dimensions.get("window");

const MyHeader = ({
  title = "Title",
  titleColor = "#000",
  onPressSettings,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </View>

      {/* Optional Settings Icon */}
      {onPressSettings && (
        <TouchableOpacity style={styles.settingsIcon} onPress={onPressSettings}>
          <Feather name="settings" size={22} color="#0A3953" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    marginVertical: 5,
  },
  titleContainer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  settingsIcon: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 6,
    borderRadius: 20,
    position: "absolute",
    right: 15, // Adjust based on design
  },
});

export default MyHeader;
