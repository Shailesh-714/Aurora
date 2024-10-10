import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import TrackFoodPopup from "../popup/TrackFoodPopup";
import { TrackFoodData } from "../../data/OptionsData";
import { AppContext } from "../../context/AppContext";

const TrackFood = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { foodData, proteinNeed, fatNeed, carbNeed, calNeed, fiberNeed } =
    useContext(AppContext);
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {}, []);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={50}
                progress={foodData.calories / calNeed || 0}
                borderWidth={0}
                thickness={3}
                color="#F14C6E"
                strokeCap="round"
                showsText={false}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="black"
                />
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "space-evenly", marginLeft: "10%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Track Food</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>
              {foodData.calories.toFixed(0) || 0} of {calNeed} Cal Eaten
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleModalOpen}>
          <AntDesign name="pluscircleo" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          margin: 20,
          alignItems: "center",
          padding: 10,
          borderRadius: 30,
          backgroundColor: "#d0e2df",
          width: "60%",
          justifyContent: "space-evenly",
        }}
      >
        <MaterialIcons name="insights" size={24} color="#155c4f" />
        <Text style={{ color: "#155c4f" }}>Your Food Insight</Text>
      </View>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "20%" }}>
          <View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={40}
                progress={foodData.protein / proteinNeed || 0}
                borderWidth={0}
                thickness={2}
                color="#d9cd2c"
                strokeCap="round"
                showsText={false}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="egg-fried"
                  size={25}
                  color="black"
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", margin: 5 }}>
            <Text style={{ color: "grey", fontSize: 12 }}>Protein</Text>
          </View>
        </View>
        <View style={{ width: "20%" }}>
          <View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={40}
                progress={foodData.fat / fatNeed || 0}
                borderWidth={0}
                thickness={2}
                color="#18a561"
                strokeCap="round"
                showsText={false}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <Ionicons name="water-outline" size={20} color="black" />
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", margin: 5 }}>
            <Text style={{ color: "grey", fontSize: 12 }}>Fats</Text>
          </View>
        </View>
        <View style={{ width: "20%" }}>
          <View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={40}
                progress={foodData.carbs / carbNeed || 0}
                borderWidth={0}
                thickness={2}
                color="#18a561"
                strokeCap="round"
                showsText={false}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="bread-slice-outline"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", margin: 5 }}>
            <Text style={{ color: "grey", fontSize: 12 }}>Carbs</Text>
          </View>
        </View>
        <View style={{ width: "20%" }}>
          <View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={40}
                progress={foodData.fiber / fiberNeed || 0}
                borderWidth={0}
                thickness={2}
                color="#d9cd2c"
                strokeCap="round"
                showsText={false}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <Ionicons name="leaf-outline" size={20} color="black" />
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", margin: 5 }}>
            <Text style={{ color: "grey", fontSize: 12 }}>Fibre</Text>
          </View>
        </View>
      </View>
      <TrackFoodPopup
        visible={modalVisible}
        onClose={handleModalClose}
        title={"Exercises"}
        data={TrackFoodData}
      />
    </View>
  );
};

export default TrackFood;

const styles = StyleSheet.create({});
