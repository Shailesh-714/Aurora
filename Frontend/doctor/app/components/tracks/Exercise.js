import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ExercisePopUp from "../popup/ExercisePopUp";
import { ExerciseData } from "../../data/OptionsData";
import { AppContext } from "../../context/AppContext";

const Exercise = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { exerData, setExerData } = useContext(AppContext);

  console.log(exerData);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

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
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Exercise</Text>
        <TouchableOpacity onPress={handleModalOpen}>
          <AntDesign name="pluscircleo" size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="fire" size={22} color="#F6AD3E" />
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {exerData.calories || 0} cal
        </Text>
      </View>
      <View
        style={{
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name="clockcircle" size={20} color="#F6AD3E" />
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {Math.floor(exerData.minutes / 60)
            .toString()
            .padStart(2, "0") || 0}
          :{(exerData.minutes % 60).toString().padStart(2, "0") || "00"} hr
        </Text>
      </View>

      {/* Pass modalVisible, onClose, and data as props to PopUp */}
      <ExercisePopUp
        visible={modalVisible}
        onClose={handleModalClose}
        title={"Exercises"}
        data={ExerciseData}
      />
    </View>
  );
};

export default Exercise;
