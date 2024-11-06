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
import HomeBg from "../assets/images/backgrounds/appScreenBg/home.jpg";
import ActivitySelector from "../components/tracks/ActivitySelector";
import StatisticReport from "../components/tracks/StatisticReport";
const { height, width } = Dimensions.get("window");
const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={{ flex: 1 }} source={HomeBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Home" titleColor="#101D4A" />

        <ScrollView>
          <View
            style={{
              marginHorizontal: width * 0.04,
              marginVertical: 15,
              gap: 20,
            }}
          >
            <ActivitySelector />
            <HealthReport />
            <StatisticReport />

            <View
              style={{
                flexDirection: "row",
                gap: width * 0.05,
              }}
            >
              <Steps />
              <Exercise />
            </View>
            <TrackFood />
            <AdditionalTracks />
            <View
              style={{
                backgroundColor: "transparent",
                borderRadius: 20,
                padding: 30,
              }}
            />
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
