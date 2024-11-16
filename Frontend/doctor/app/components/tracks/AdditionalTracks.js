import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";
const { width, height } = Dimensions.get("window");

const InputModal = ({
  visible,
  onClose,
  name,
  unit,
  value,
  setValue,
  icon,
  color,
}) => {
  const [input, setInput] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (visible) {
      setInput(value); // Update input whenever the modal opens or value changes
    }
  }, [visible, value]);

  const handleSave = () => {
    setValue(parseInt(input) || 0);
    setInput(0);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setInput(0);
                onClose();
              }}
              style={{ alignSelf: "center" }}
            >
              <Ionicons name="close" size={22} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{name}</Text>
            <TouchableOpacity onPress={handleSave}>
              <MaterialIcons name="done" size={22} color={color} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalRow}>
            <View style={styles.modalCounter}>
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: color,
                  borderRadius: 10,
                }}
                onPress={() => setInput(Math.max(0, parseInt(input) - 1))}
              >
                <Entypo name="minus" size={16} color="white" />
              </TouchableOpacity>
              <TextInput
                style={[styles.input]}
                keyboardType="numeric"
                value={String(input || 0)}
                onChangeText={(text) => {
                  // Remove any leading zeros
                  const sanitizedText = text.replace(/^0+/, "");
                  setInput(sanitizedText);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: color,
                  borderRadius: 10,
                }}
                onPress={() => setInput(parseInt(input) + 1)}
              >
                <Entypo name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{unit}</Text>
        </View>
      </View>
    </Modal>
  );
};

const AdditionalTracks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const {
    water,
    setWater,
    sleep,
    setSleep,
    meditation,
    setMeditation,
    waterNeed,
  } = useContext(AppContext);

  const handleOpenModal = (track) => {
    setSelectedTrack(track);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Water Tracking */}
      <TrackingItem
        label="Water"
        value={`${water} of ${waterNeed} Glasses`}
        icon={<FontAwesome6 name="glass-water" size={18} color="#228bc7" />}
        onPress={() =>
          handleOpenModal({
            name: "Water",
            icon: <FontAwesome6 name="glass-water" size={18} color="#228bc7" />,
            unit: "Glasses",
            value: water,
            setValue: setWater,
            color: "#228bc7",
          })
        }
      />
      {/* Sleep Tracking */}
      <TrackingItem
        label="Sleep"
        value={`${sleep} of 8 hr`}
        icon={<Ionicons name="cloudy-night-sharp" size={18} color="#8856b5" />}
        onPress={() =>
          handleOpenModal({
            name: "Sleep",
            icon: (
              <Ionicons name="cloudy-night-sharp" size={18} color="#8856b5" />
            ),
            unit: "Hours",
            value: sleep,
            setValue: setSleep,
            color: "#8856b5",
          })
        }
      />
      {/* Meditation Tracking */}
      <TrackingItem
        label="Meditation"
        value={`${meditation} min`}
        icon={
          <MaterialCommunityIcons name="meditation" size={18} color="#32CD32" />
        }
        onPress={() =>
          handleOpenModal({
            name: "Meditation",
            icon: (
              <MaterialCommunityIcons
                name="meditation"
                size={18}
                color="#32CD32"
              />
            ),
            unit: "Minutes",
            value: meditation,
            setValue: setMeditation,
            color: "#32CD32",
          })
        }
      />
      {/* Modal for Input */}
      <InputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        name={selectedTrack?.name}
        icon={selectedTrack?.icon}
        unit={selectedTrack?.unit}
        value={selectedTrack?.value}
        setValue={selectedTrack?.setValue}
        color={selectedTrack?.color}
      />
    </View>
  );
};

const TrackingItem = ({ label, value, icon, onPress }) => (
  <View style={styles.trackingItem}>
    <View style={styles.trackingItemInfo}>
      <View style={{ width: 20 }}>{icon}</View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{label}</Text>
        <Text style={{ fontSize: 12, color: "grey" }}>{value}</Text>
      </View>
    </View>
    <AntDesign name="pluscircleo" size={18} color="black" onPress={onPress} />
  </View>
);

export default AdditionalTracks;

const styles = StyleSheet.create({
  container: {
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
  },
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
    borderRadius: 20,
    alignItems: "center",
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  modalCounter: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 15,
  },
  trackingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackingItemInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
