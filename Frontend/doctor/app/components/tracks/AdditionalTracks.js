import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";
const { width, height } = Dimensions.get("window");

// Modal Component to get input data
const InputModal = ({ visible, onClose, name, unit, value, setValue }) => {
  const [input, setInput] = useState(String(value || ""));
  const [isFocused, setIsFocused] = useState(false);
  const handleSave = () => {
    setValue(parseInt(input));
    setInput("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.modalTitle}>{name}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{ position: "absolute", left: 0, alignSelf: "center" }}
            >
              <Ionicons name="arrow-back" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              No: of {unit}
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: isFocused ? "#ff7676" : "black" },
              ]}
              keyboardType="numeric"
              value={String(input || "")}
              onChangeText={(text) => setInput(text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={{ backgroundColor: "#ff7676", borderRadius: 10 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Main Component
const AdditionalTracks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { water, setWater, sleep, setSleep, meditation, setMeditation } =
    useContext(AppContext);

  const handleOpenModal = (track) => {
    setSelectedTrack(track);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        marginVertical: 20,
        rowGap: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      {/* Water Tracking */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6 name="glass-water" size={18} color="#228bc7" />
          <View style={{ marginLeft: "15%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Water</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>
              {water} of 6 Glasses
            </Text>
          </View>
        </View>
        <AntDesign
          name="pluscircleo"
          size={18}
          color="black"
          onPress={() =>
            handleOpenModal({
              name: "Water",
              unit: "Glasses",
              value: water,
              setValue: setWater,
            })
          }
        />
      </View>

      {/* Sleep Tracking */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="cloudy-night-sharp" size={18} color="#8856b5" />
          <View style={{ marginLeft: "10%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Sleep</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>{sleep} of 8 hr</Text>
          </View>
        </View>
        <AntDesign
          name="pluscircleo"
          size={18}
          color="black"
          onPress={() =>
            handleOpenModal({
              name: "Sleep",
              unit: "Hours",
              value: sleep,
              setValue: setSleep,
            })
          }
        />
      </View>

      {/* Meditation Tracking */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="meditation" size={18} color="#32CD32" />
          <View style={{ marginLeft: "10%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Meditation</Text>
            <Text style={{ fontSize: 12, color: "grey" }}>
              {meditation} min
            </Text>
          </View>
        </View>
        <AntDesign
          name="pluscircleo"
          size={18}
          color="black"
          onPress={() =>
            handleOpenModal({
              name: "Meditation",
              unit: "Minutes",
              value: meditation,
              setValue: setMeditation,
            })
          }
        />
      </View>

      {/* Modal for Input */}
      <InputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        name={selectedTrack?.name}
        unit={selectedTrack?.unit}
        value={selectedTrack?.value}
        setValue={selectedTrack?.setValue}
      />
    </View>
  );
};

export default AdditionalTracks;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7676",
  },
  input: {
    borderBottomWidth: 2,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    paddingHorizontal: 5,
  },
});
