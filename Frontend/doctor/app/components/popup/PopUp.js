import React, { useState, useEffect } from "react";
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

const { height } = Dimensions.get("window");

const PopUp = ({ visible, onClose, title, data, value, setValue }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(height));
  const [detailsTab, setDetailsTab] = useState(false);
  const [selectExercise, setSelectExercise] = useState(null);
  const [query, setQuery] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSelectExer = (item) => {
    setDetailsTab(true);
    setSelectExercise(item); // Now item is correctly passed
  };

  const totCalories = (minutes) => {
    return selectExercise ? minutes * selectExercise.caloriesPerMinute : 0;
  };

  // Filter exercises based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

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
          toValue: height, // Slide down out of view
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
        {/* Background Fade View */}
        <Animated.View
          style={[styles.modalBackground, { opacity: fadeAnim }]}
        />
        {/* Sliding Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {detailsTab ? (
            /*updateTab*/
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
                    setDetailsTab(false), setMinutes(0);
                  }}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDetailsTab(false), setMinutes(0);
                  }}
                >
                  <MaterialIcons name="done" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 30,
                  marginHorizontal: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>Minutes Performed</Text>
                <TextInput
                  placeholder="e.g. 30"
                  placeholderTextColor={"grey"}
                  style={{ fontSize: 16 }}
                  keyboardType="numeric"
                  value={minutes} // Correct binding of `minutes`
                  onChangeText={(value) => setMinutes(value)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",

                  marginHorizontal: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>Calories Burned</Text>
                <Text style={{ fontSize: 16 }}>
                  {totCalories(parseInt(minutes) || 0)}
                </Text>
              </View>
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
                    <TouchableOpacity onPress={() => handleSelectExer(item)}>
                      <Text style={styles.item}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
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
    padding: 15,
  },
  item: {
    margin: 15,
  },
});

export default PopUp;
