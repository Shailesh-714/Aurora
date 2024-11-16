import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import * as Progress from "react-native-progress";
import { AppContext } from "../../context/AppContext";

const HealthReport = () => {
  const { foodHealth, exerciseHealth, skinHealth, mentalHealth, healthScore } =
    useContext(AppContext);

  if (
    [foodHealth, exerciseHealth, skinHealth, mentalHealth, healthScore].some(
      (value) => value === null || isNaN(value)
    )
  ) {
    return null;
  }
  const [healthRate, setHealthRate] = useState({
    color: "#ff7676",
    level: "low",
  });
  useEffect(() => {
    if (healthScore < 0.3) {
      setHealthRate({ color: "#ff7676", level: "Low" });
    } else if (healthScore >= 0.3 && healthScore < 0.7) {
      setHealthRate({ color: "#fccc44", level: "Average" });
    } else {
      setHealthRate({ color: "#69c866", level: "Good" });
    }
  }, [healthScore]);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Health Stat</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: "bold",
              }}
            >
              Food
            </Text>
            <ProgressBar
              color={"#7C4D96"}
              progress={parseFloat(foodHealth || 0)}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: "bold",
              }}
            >
              Mental
            </Text>
            <ProgressBar
              color={"#87ceeb"}
              progress={parseFloat(mentalHealth || 0)}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: "bold",
              }}
            >
              Skin
            </Text>
            <ProgressBar
              color={"#FFAE0E"}
              progress={parseFloat(skinHealth || 0)}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: "bold",
              }}
            >
              Exercise
            </Text>
            <ProgressBar
              color={"#F14C6E"}
              progress={parseFloat(exerciseHealth || 0)}
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Progress.Circle
            size={100}
            progress={parseFloat(healthScore || 0)}
            borderWidth={0}
            thickness={6}
            color={healthRate.color}
            strokeCap="round"
            showsText={false}
            unfilledColor="#f2f2f2"
          />
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: healthRate.color,
              }}
            >
              {`${
                healthScore <= 100 && healthScore >= 0
                  ? parseInt(healthScore * 100)
                  : 0
              }%`}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 2,
              }}
            >
              {healthRate.level}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HealthReport;

const styles = StyleSheet.create({});
