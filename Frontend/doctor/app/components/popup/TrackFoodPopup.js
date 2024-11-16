import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";

const { height } = Dimensions.get("window");

const TrackFoodPopup = ({ visible, onClose, title, data }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(height));
  const [detailsTab, setDetailsTab] = useState(false);
  const [selectFood, setSelectFood] = useState(null);
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState("");
  const { foodData, setFoodData } = useContext(AppContext);
  const handleSelectFood = (item) => {
    setDetailsTab(true);
    setSelectFood(item);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSave = () => {
    setFoodData({
      calories:
        (foodData.calories || 0) +
        ((selectFood.calories / selectFood.quantity) * quantity || 0),
      protein:
        (foodData.protein || 0) +
        ((selectFood.protein / selectFood.quantity) * quantity || 0),
      fat:
        (foodData.fat || 0) +
        ((selectFood.fat / selectFood.quantity) * quantity || 0),
      carbs:
        (foodData.carbs || 0) +
        ((selectFood.carbs / selectFood.quantity) * quantity || 0),
      fiber:
        (foodData.fiber || 0) +
        ((selectFood.fiber / selectFood.quantity) * quantity || 0),
    });
    setQuantity(0);
    setDetailsTab(false);
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onClose());
      setDetailsTab(false);
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.modalBackground, { opacity: fadeAnim }]}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {detailsTab ? (
            <View
              style={{
                margin: 20,
                height: height * 0.8,
                marginVertical: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setDetailsTab(false), setQuantity(0);
                  }}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", display: "flex" }}
                >
                  {selectFood.name}
                </Text>
                <TouchableOpacity onPress={handleSave}>
                  <MaterialIcons name="done" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 30,
                  marginHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Food Quantity
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <TextInput
                    placeholder={"0"}
                    placeholderTextColor={"grey"}
                    style={{ fontSize: 16, width: 50, textAlign: "right" }}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={(value) => setQuantity(value)}
                  />
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {selectFood.unit}
                  </Text>
                </View>
              </View>
              {["Protein", "Fat", "Carbs", "Fiber", "Calories"].map(
                (label, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{label}</Text>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <Text style={{ fontSize: 16 }}>
                        {(
                          (selectFood[label.toLowerCase()] /
                            selectFood.quantity) *
                            quantity || 0
                        ).toFixed(2)}
                      </Text>
                      <Text style={{ fontSize: 16 }}>
                        {label === "Calories" ? "cal" : "g"}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                  <AntDesign name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
              {/* DataList Component to display exercise data */}
              <View>
                <KeyboardAvoidingView>
                  <View style={styles.header}>
                    <TextInput
                      placeholder="Search here..."
                      placeholderTextColor={"grey"}
                      value={query}
                      onChangeText={setQuery}
                      style={styles.input}
                    />
                  </View>
                </KeyboardAvoidingView>
                <FlatList
                  data={filteredData}
                  showsVerticalScrollIndicator={false}
                  snapToEnd
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectFood(item)}>
                      <Text style={styles.item}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{ paddingBottom: 100 }}
                />
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    minHeight: height,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.8,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  item: {
    margin: 15,
  },
});

export default TrackFoodPopup;
