import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ExeDetails = ({ setDetailsTab, onClose }) => {
  const { height } = Dimensions.get("window");

  return (
    <View
      style={{
        margin: 20,
        height: height * 0.8,
        marginVertical: 30,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => setDetailsTab(false)}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDetailsTab(false)}>
          <MaterialIcons name="done" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 30,
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
