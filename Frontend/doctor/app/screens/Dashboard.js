import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const chatList = [
  {
    id: "1",
    name: "Dr. John Doe",
    value: "psychatrist",
    description: "Specialist in Psychiatry",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Dr. Jane Smith",
    value: "pediatrisian",
    description: "Expert Pediatrician",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "3",
    name: "Dr. Mike Johnson",
    value: "dermatologist",
    description: "Experienced Dermatologist",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "4",
    name: "Dr. Sarah Lee",
    value: "gynaecologist",
    description: "Gynaecology Specialist",
    image: "https://randomuser.me/api/portraits/women/0.jpg",
  },
];

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title="Activity"
        right="more-vertical"
        onRightPress={() => {}}
      />

      <ScrollView>
        <View
          style={{ backgroundColor: "white", borderRadius: 20, padding: 20 }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Dashboard</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.4}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.5}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.7}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.3}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Progress.Circle
                size={100}
                progress={0.7}
                borderWidth={0}
                thickness={7}
                color="#F14C6E"
                showsText={true}
                strokeCap="round"
                formatText={() => {
                  return `${0.7 * 100}%`;
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1EB",
    gap: 15,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  chatDescription: {
    color: "#666",
    fontSize: 14,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});
