import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";
import Steps from "../components/tracks/Steps";
import Exercise from "../components/tracks/Exercise";
import HealthReport from "../components/tracks/HealthReport";
import TrackFood from "../components/tracks/TrackFood";
import AdditionalTracks from "../components/tracks/AdditionalTracks";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import HomeBg from "../assets/images/backgrounds/appScreenBg/home.jpg";
const { height } = Dimensions.get("window");
const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={{ flex: 1 }} source={HomeBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Home" titleColor="#5BB2D0" />

        <ScrollView>
          <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
            <HealthReport />
            <View style={{ flexDirection: "row", gap: 20, marginVertical: 20 }}>
              <Steps />
              <Exercise />
            </View>
            <TrackFood />
            <AdditionalTracks />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 30,
              }}
            ></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
});
