import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ExeDetails = () => {
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        margin: 20,
        height: height * 0.8,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <MaterialIcons name="done" size={24} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>Minutes Performed</Text>
        <TextInput
          placeholder="e.g. 30"
          placeholderTextColor={"grey"}
          style={{ fontSize: 16 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",

          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>Calories Burned</Text>
        <Text style={{ fontSize: 16 }}>0</Text>
      </View>
    </View>
  );
};

export default ExeDetails;

const styles = StyleSheet.create({});
