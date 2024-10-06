import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons, FontAwesome6 } from "@expo/vector-icons";

const AdditionalTracks = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        marginVertical: 20,
        rowGap: 25,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "center" }}>
            <FontAwesome6 name="glass-water" size={24} color="#228bc7" />
          </View>
          <View style={{ justifyContent: "space-evenly", marginLeft: "15%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Water</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>3 of 6 Glasses</Text>
          </View>
        </View>
        <View>
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "center" }}>
            <Ionicons name="cloudy-night-sharp" size={24} color="#8856b5" />
          </View>
          <View style={{ justifyContent: "space-evenly", marginLeft: "10%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Sleep</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>
              7 hr 30 min of 8 hr
            </Text>
          </View>
        </View>

        <View>
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "center" }}>
            <FontAwesome6 name="weight-scale" size={24} color="#ae3232" />
          </View>
          <View style={{ justifyContent: "space-evenly", marginLeft: "15%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Weight</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>49 kgs</Text>
          </View>
        </View>

        <View>
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
    </View>
  );
};

export default AdditionalTracks;

const styles = StyleSheet.create({});
