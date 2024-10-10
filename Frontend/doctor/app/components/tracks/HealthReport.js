import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "../ProgressBar";
import * as Progress from "react-native-progress";

const HealthReport = () => {
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
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Dashboard</Text>
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
                fontWeight: 500,
                color: "#888",
              }}
            >
              Food
            </Text>
            <ProgressBar color={"#5BB2D0"} progress={0.6} />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: 500,
                color: "#888",
              }}
            >
              Mental
            </Text>
            <ProgressBar color={"#5BB2D0"} progress={0.8} />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: 500,
                color: "#888",
              }}
            >
              Skin
            </Text>
            <ProgressBar color={"#5BB2D0"} progress={0.4} />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 10,
                padding: "1%",
                fontWeight: 500,
                color: "#888",
              }}
            >
              Exercise
            </Text>
            <ProgressBar color={"#5BB2D0"} progress={0.9} />
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
            progress={0.7}
            borderWidth={0}
            thickness={7}
            color="#F14C6E"
            strokeCap="round"
            showsText={false}
          />

          {}
          <View
            style={{
              position: "absolute",
              alignItems: "center",
            }}
          >
            {}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#F14C6E",
              }}
            >
              {`${0.7 * 100}%`}
            </Text>

            {}
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                marginTop: 2,
              }}
            >
              Health
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HealthReport;

const styles = StyleSheet.create({});
