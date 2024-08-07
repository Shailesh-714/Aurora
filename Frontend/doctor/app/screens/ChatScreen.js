import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChatScreen = () => {
  const screenWidth = useWindowDimensions("window").width;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          minWidth: screenWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/emologo.png")}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "500",
              marginRight: 10,
              paddingLeft: 5,
            }}
          >
            Emo
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            position: "absolute",
            left: screenWidth * 0.05,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
