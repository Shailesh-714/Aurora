import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  PanResponder,
  Animated,
  Platform,
} from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import ProfileBg from "../assets/images/backgrounds/appScreenBg/profileBg.jpg";
import BMI_Img from "../assets/images/icons/bmi.png";
import HealthScoreImg from "../assets/images/icons/healthScore.png";
import GenderImg from "../assets/images/icons/gender.png";
import AgeImg from "../assets/images/icons/age.png";
import WeightImg from "../assets/images/icons/weight.png";
import HeightImg from "../assets/images/icons/height.png";
import LogoutImg from "../assets/images/icons/logout.png";
import { AppContext } from "../context/AppContext";
import MyHeader from "../components/tab_bar/MyHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const {
    userInfo,
    setUserInfo,
    username,
    setUsername,
    profileImage,
    setProfileImage,
  } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <ImageBackground source={ProfileBg} style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <SafeAreaView>
          <MyHeader
            title="Profile"
            titleColor="#0A3953"
            onPressSettings={() => navigation.navigate("UserDetailsScreen")}
          />
        </SafeAreaView>

        <View style={styles.content}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ width: width * 0.9 }}>
              <View style={{ flexDirection: "column", gap: 4 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Welcome to Aurora
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {username}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <View
                  style={{
                    borderWidth: 3,
                    borderColor: "white",
                    padding: 5,
                    borderRadius: 500,
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
                </View>
              </View>
            </View>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingVertical: 15,
                gap: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Image source={BMI_Img} style={{ width: 40, height: 40 }} />
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>BMI</Text>
                  <Text style={{ fontWeight: "500" }}>
                    {userInfo.bmi} points
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: "100%",
                  width: 1,
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Image
                  source={HealthScoreImg}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Health
                  </Text>
                  <Text style={{ fontWeight: "500" }}>5 points</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center", width: width * 0.9 }}>
              <View style={{ flexDirection: "column", gap: width * 0.04 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: width * 0.04,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 25,
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Image source={AgeImg} style={{ width: 40, height: 40 }} />
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Age
                      </Text>
                      <Text style={{ fontWeight: "500" }}>
                        {userInfo.age || 0} yrs
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 25,
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Image
                      source={GenderImg}
                      style={{ width: 40, height: 40 }}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Gender
                      </Text>
                      <Text style={{ fontWeight: "500" }}>
                        {userInfo.gender || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: width * 0.04,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 25,
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Image
                      source={HeightImg}
                      style={{ width: 40, height: 40 }}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Height
                      </Text>
                      <Text style={{ fontWeight: "500" }}>
                        {userInfo.height || 0} cm
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 25,
                      backgroundColor: "white",
                      borderRadius: 15,
                      padding: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Image
                      source={WeightImg}
                      style={{ width: 40, height: 40 }}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        weight
                      </Text>
                      <Text style={{ fontWeight: "500" }}>
                        {userInfo.weight || 0} Kgs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: width * 0.9,
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    padding: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <Image
                    source={LogoutImg}
                    style={{ width: 40, height: 40, zIndex: 1 }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    position: "relative",
                    left: -12,
                    zIndex: -1,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: height * 0.03,
  },
  content: { flex: 1, alignItems: "center", marginBottom: 100 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "white",
  },
  loading: {
    fontSize: 18,
    color: "#888",
  },
});

export default ProfileScreen;
