import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import PopUp from "../popup/PopUp"; // Import the updated PopUp component
import { ExerciseData } from "../../data/OptionsData";
import { AppContext } from "../../context/AppContext";

const Exercise = () => {
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const { exerData, setExerData } = useContext(AppContext);

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
          25 Calories
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
          01:00 hr
        </Text>
      </View>

      {/* Pass modalVisible, onClose, and data as props to PopUp */}
      <PopUp
        visible={modalVisible}
        onClose={handleModalClose}
        title={"Exercises"}
        data={ExerciseData}
        value={exerData}
        setValue={setExerData}
      />
    </View>
  );
};

export default Exercise;
