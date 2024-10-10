import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { AppContext } from "../context/AppContext"; // Import the context
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const EditProfileScreen = () => {
  const {
    userInfo,
    setUserInfo,
    username,
    setUsername,
    profileImage,
    setProfileImage,
  } = useContext(AppContext); // Use the context to access global state
  const navigation = useNavigation();
  const [localUserInfo, setLocalUserInfo] = useState({ ...userInfo }); // Local state to handle input changes
  const [localUsername, setLocalUsername] = useState(username);
  const [mediaModal, setMediaModal] = useState(false);

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (weight > 0 && height > 0) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(1);
      return bmiValue;
    }
    return 0;
  };

  // Automatically recalculate BMI when weight or height changes locally
  useEffect(() => {
    const bmiValue = calculateBMI(localUserInfo.weight, localUserInfo.height);
    setLocalUserInfo((prev) => ({ ...prev, bmi: bmiValue }));
  }, [localUserInfo.weight, localUserInfo.height]);

  // Function to pick profile image
  const uploadImageCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMediaModal(false);
    }
  };
  const uploadImageMedia = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMediaModal(false);
    }
  };
  const deleteImage = async () => {
    setProfileImage("");
    setMediaModal(false);
  };
  const handleModalClose = () => {
    setMediaModal(false);
  };

  const handleUpdate = () => {
    setUserInfo(localUserInfo);
    setUsername(localUsername);
    Alert.alert(
      "Profile Updated",
      "Your profile information has been updated."
    );
    navigation.goBack();
  };
  const [genderModalVisible, setGenderModalVisible] = useState(false); // Modal visibility state

  const genders = ["Male", "Female", "Other"];
  const renderGenderModal = () => (
    <Modal
      transparent={true}
      visible={genderModalVisible}
      animationType="fade"
      onRequestClose={() => setGenderModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={genders}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.genderOption}
                onPress={() => {
                  setLocalUserInfo((prev) => ({ ...prev, gender: item }));
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.genderText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical: 4,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#ff7676",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            borderRadius: 100,
            backgroundColor: "white",
            padding: 6,
            left: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,

          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 1000,
                  borderWidth: 2,
                  padding: 3,
                  borderColor: "#ff7676",
                }}
              >
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("../assets/appLogo.png")
                  }
                  style={styles.profileImage}
                />
                <TouchableOpacity
                  onPress={() => setMediaModal(true)}
                  style={{
                    position: "absolute",
                    borderRadius: 100,
                    backgroundColor: "white",
                    padding: 6,
                    bottom: 0,
                    right: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <Feather name="camera" size={18} color="#ff7676" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Username */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={localUsername}
                onChangeText={setLocalUsername}
              />
            </View>

            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(localUserInfo.age || "")}
                onChangeText={(text) =>
                  setLocalUserInfo((prev) => ({ ...prev, age: parseInt(text) }))
                }
              />
            </View>

            {/* Weight */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(localUserInfo.weight || "")}
                onChangeText={(text) =>
                  setLocalUserInfo((prev) => ({
                    ...prev,
                    weight: parseFloat(text),
                  }))
                }
              />
            </View>

            {/* Height */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(localUserInfo.height || "")}
                onChangeText={(text) =>
                  setLocalUserInfo((prev) => ({
                    ...prev,
                    height: parseFloat(text),
                  }))
                }
              />
            </View>

            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={styles.customDropdown}
                onPress={() => setGenderModalVisible(true)}
              >
                <Text style={styles.customDropdownText}>
                  {localUserInfo.gender || "Select Gender"}
                </Text>
                <AntDesign name="down" size={16} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={mediaModal}
        onRequestClose={handleModalClose}
      >
        <View
          style={{
            width: width,
            borderRadius: 20,
            backgroundColor: "white",
            position: "absolute",
            alignSelf: "center",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "#eb104e",
              paddingTop: 10,
              fontSize: 15,
              paddingBottom: 6,
              paddingHorizontal: 8,
              borderBottomWidth: 2,
              borderColor: "rgba(0,0,0,0.15)",
            }}
          >
            Change Profile Picture
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              flex: 1,
              width: "100%",
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={uploadImageCamera}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Feather name="camera" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={uploadImageMedia}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="perm-media" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteImage}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="delete-outline" size={36} color="#eb104e" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleModalClose}
            style={{ position: "absolute", top: 12, right: 20 }}
          >
            <AntDesign name="close" size={20} color="#eb104e" />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Render Modal */}
      {renderGenderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: "white",
    gap: height * 0.05,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    paddingHorizontal: 5,
    position: "absolute",
    top: -7,
    left: 10,
    zIndex: 2,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontWeight: "500",
  },
  customDropdown: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  customDropdownText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  updateButton: {
    backgroundColor: "#ff7676",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  genderOption: {
    flex: 1,
    paddingVertical: 10, // Adjust padding for a better touch area
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white", // Ensure no background color conflicts
  },

  genderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default EditProfileScreen;
