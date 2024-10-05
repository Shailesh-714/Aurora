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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProgressBar from "../components/ProgressBar";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  FontAwesome6,
} from "@expo/vector-icons";
import Steps from "../components/tracks/Steps";
import Exercise from "../components/tracks/Exercise";

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
        <View style={{ margin: 20 }}>
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
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: "1%",
                      fontWeight: 500,
                      color: "#888",
                    }}
                  >
                    Food
                  </Text>
                  <ProgressBar color={"#5BB2D0"} progress={0.6} />
                </View>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: "1%",
                      fontWeight: 500,
                      color: "#888",
                    }}
                  >
                    Mental
                  </Text>
                  <ProgressBar color={"#5BB2D0"} progress={0.8} />
                </View>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: "1%",
                      fontWeight: 500,
                      color: "#888",
                    }}
                  >
                    Skin
                  </Text>
                  <ProgressBar color={"#5BB2D0"} progress={0.4} />
                </View>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: "1%",
                      fontWeight: 500,
                      color: "#888",
                    }}
                  >
                    Exercise
                  </Text>
                  <ProgressBar color={"#5BB2D0"} progress={0.9} />
                </View>
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
                  strokeCap="round"
                  showsText={false}
                />

                {}
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                  }}
                >
                  {}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#F14C6E",
                    }}
                  >
                    {`${0.7 * 100}%`}
                  </Text>

                  {}
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#888",
                      marginTop: 2,
                    }}
                  >
                    Health
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 20, marginVertical: 20 }}>
            <Steps />
            <Exercise />
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Progress.Circle
                      size={50}
                      progress={0.7}
                      borderWidth={0}
                      thickness={3}
                      color="#F14C6E"
                      strokeCap="round"
                      showsText={false}
                    />

                    <View
                      style={{
                        position: "absolute",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={20}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{ justifyContent: "space-evenly", marginLeft: "10%" }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Track Food
                  </Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    0 of 1,800 Cal Eaten
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="pluscircleo" size={18} color="black" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                margin: 20,
                alignItems: "center",
                padding: 10,
                borderRadius: 30,
                backgroundColor: "#d0e2df",
                width: "60%",
                justifyContent: "space-evenly",
              }}
            >
              <MaterialIcons name="insights" size={24} color="#155c4f" />
              <Text style={{ color: "#155c4f" }}>Your Food Insight</Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-evenly",
              }}
            >
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Progress.Circle
                      size={40}
                      progress={0.6}
                      borderWidth={0}
                      thickness={2}
                      color="#d9cd2c"
                      strokeCap="round"
                      showsText={false}
                    />

                    <View
                      style={{
                        position: "absolute",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="egg-fried"
                        size={25}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center", margin: 5 }}>
                  <Text style={{ color: "grey", fontSize: 12 }}>Protein</Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Progress.Circle
                      size={40}
                      progress={0.4}
                      borderWidth={0}
                      thickness={2}
                      color="#18a561"
                      strokeCap="round"
                      showsText={false}
                    />

                    <View
                      style={{
                        position: "absolute",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="water-outline" size={20} color="black" />
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center", margin: 5 }}>
                  <Text style={{ color: "grey", fontSize: 12 }}>Fats</Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Progress.Circle
                      size={40}
                      progress={0.7}
                      borderWidth={0}
                      thickness={2}
                      color="#18a561"
                      strokeCap="round"
                      showsText={false}
                    />

                    <View
                      style={{
                        position: "absolute",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bread-slice-outline"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center", margin: 5 }}>
                  <Text style={{ color: "grey", fontSize: 12 }}>Carbs</Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Progress.Circle
                      size={40}
                      progress={0.3}
                      borderWidth={0}
                      thickness={2}
                      color="#d9cd2c"
                      strokeCap="round"
                      showsText={false}
                    />

                    <View
                      style={{
                        position: "absolute",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="leaf-outline" size={20} color="black" />
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center", margin: 5 }}>
                  <Text style={{ color: "grey", fontSize: 12 }}>Fibre</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 30,
              marginVertical: 20,
              rowGap: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignSelf: "center" }}>
                  <FontAwesome6 name="glass-water" size={24} color="#228bc7" />
                </View>
                <View
                  style={{ justifyContent: "space-evenly", marginLeft: "15%" }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Water
                  </Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    3 of 6 Glasses
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="pluscircleo" size={18} color="black" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignSelf: "center" }}>
                  <Ionicons
                    name="cloudy-night-sharp"
                    size={24}
                    color="#8856b5"
                  />
                </View>
                <View
                  style={{ justifyContent: "space-evenly", marginLeft: "10%" }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Sleep
                  </Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    7 hr 30 min of 8 hr
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="pluscircleo" size={18} color="black" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignSelf: "center" }}>
                  <FontAwesome6 name="weight-scale" size={24} color="#ae3232" />
                </View>
                <View
                  style={{ justifyContent: "space-evenly", marginLeft: "15%" }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Weight
                  </Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>49 kgs</Text>
                </View>
              </View>

              <View>
                <AntDesign name="pluscircleo" size={18} color="black" />
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 30,
            }}
          ></View>
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
    gap: 5,
  }

});
