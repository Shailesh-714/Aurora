import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomLineChart from "../CustomLineChart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CaloryContext } from "../../context/CaloryContext";
import { AppContext } from "../../context/AppContext";

const StatisticReport = () => {
  const { foodData, exerData } = useContext(AppContext);
  const [selectedIntakeValue, setSelectedIntakeValue] = useState(
    foodData.calories
  );
  const [selectedBurnedValue, setSelectedBurnedValue] = useState(
    exerData.calories
  );
  const [textWidth, setTextWidth] = useState(0);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Weekly Report</Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Ionicons name="caret-up" size={10} color="#87ceeb" />
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>Intake</Text>
            </View>
            <Text
              style={{ color: "#87ceeb", fontWeight: "bold", fontSize: 10 }}
            >
              {selectedIntakeValue} cal
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Ionicons name="caret-down" size={10} color="#ff7676" />
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>burned</Text>
            </View>
            <Text
              style={{
                color: "#ff7676",
                fontWeight: "bold",
                fontSize: 10,
              }}
            >
              {selectedBurnedValue} cal
            </Text>
          </View>
        </View>
      </View>
      <CustomLineChart
        setSelectedBurnedValue={setSelectedBurnedValue}
        setSelectedIntakeValue={setSelectedIntakeValue}
      />
      <Text
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setTextWidth(width);
        }}
        style={{
          position: "absolute",
          fontSize: 14,
          fontWeight: "bold",
          letterSpacing: 5,
          transform: [{ rotate: "-90deg" }],
          left: -textWidth * 0.25,
        }}
      >
        calories
      </Text>
    </View>
  );
};

export default StatisticReport;

const styles = StyleSheet.create({});
