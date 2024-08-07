import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { FadeIn, clamp } from "react-native-reanimated";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.35 : width * 0.35;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const LoginScreen = () => {
  const [providerId, setProviderId] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [register, setRegister] = React.useState(false);
  const fadeAnime = React.useRef(new Animated.Value(1)).current;

  const optionList = [
    { id: 0 },
    {
      id: 1,
      name: "Register",
      icon: require("../assets/images/icons/register.png"),
    },
    { id: 2, name: "Login", icon: require("../assets/images/icons/login.png") },
    {
      id: 3,
      name: "Google",
      icon: require("../assets/images/icons/google.png"),
    },
    {
      id: 4,
      name: "Facebook",
      icon: require("../assets/images/icons/facebook.png"),
    },
    {
      id: 5,
      name: "Twitter X",
      icon: require("../assets/images/icons/twitter-x.png"),
    },
    { id: 6 },
  ];

  const authOptions = [
    <View style={{ width: 270 }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          padding: 3,
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color="#000000"
          style={{ paddingLeft: 7, paddingRight: 5 }}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ width: 200, color: "black" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          padding: 3,
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="key-outline"
          size={24}
          color="black"
          style={{ paddingLeft: 7, paddingRight: 5 }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="password"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ width: 200, color: "black" }}
        />
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={["#ffccd7", "#ff005b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Register
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRegister(false)}
        style={{ marginTop: 3 }}
      >
        <Text style={{ textAlign: "center", fontSize: 12, letterSpacing: 1.1 }}>
          Already a member?
          <Text style={{ color: "#008FFF" }}> Login!</Text>
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={{ width: 270 }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          padding: 3,
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color="black"
          style={{ paddingLeft: 7, paddingRight: 5 }}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ width: 200, color: "black" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          padding: 3,
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="key-outline"
          size={24}
          color="black"
          style={{ paddingLeft: 7, paddingRight: 5 }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="password"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ width: 200, color: "black" }}
        />
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={["#ffccd7", "#ff005b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRegister(true)}
        style={{ marginTop: 3 }}
      >
        <Text style={{ textAlign: "center", fontSize: 12, letterSpacing: 1.1 }}>
          New User?
          <Text style={{ color: "#008FFF" }}> Create an Account</Text>
        </Text>
      </TouchableOpacity>
    </View>,
    <View>
      <TouchableOpacity
        style={{
          width: 270,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderWidth: 1,
          borderColor: "#f2f2f2",
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
        }}
      >
        <Image source={optionList[3].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Google Account
        </Text>
      </TouchableOpacity>
      <View style={{ width: 270, alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1.1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
    <View>
      <TouchableOpacity
        style={{
          width: 270,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderWidth: 1,
          borderColor: "#f2f2f2",
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
        }}
      >
        <Image source={optionList[4].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Facebook Account
        </Text>
      </TouchableOpacity>
      <View style={{ width: 270, alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1.1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
    <View>
      <TouchableOpacity
        style={{
          width: 270,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderWidth: 1,
          borderColor: "#f2f2f2",
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
        }}
      >
        <Image source={optionList[5].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Twitter X Account
        </Text>
      </TouchableOpacity>
      <View style={{ width: 270, alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1.1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", minHeight: height }}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={optionList}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          bounces={false}
          decelerationRate={Platform.OS === "ios" ? 0 : 0.9}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            alignItems: "center",
          }}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / ITEM_SIZE
            );
          }}
          renderItem={({ item, index }) => {
            if (!item.icon) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
            }

            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [80, 0, 80],
              extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
              extrapolate: "clamp",
            });

            const opacityBg = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            });
            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  height: height,
                  padding: 10,
                  justifyContent: "space-around",
                }}
              >
                <Animated.View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    zIndex: 10,
                    top: 16,
                    opacity: opacityBg,
                    ...Platform.select({
                      ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.18,
                        shadowRadius: 3.84,
                      },
                      android: {
                        elevation: 2,
                      },
                    }),
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 15 }}>
                    {item.name}
                  </Text>
                </Animated.View>
                <View
                  style={{ maxHeight: height * 0.2, minHeight: height * 0.2 }}
                >
                  <Animated.View
                    style={{
                      width: width * 0.9,
                      minHeight: 150,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                      borderRadius: 20,
                      paddingVertical: 25,
                      opacity: opacityBg,
                      ...Platform.select({
                        ios: {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                        },
                        android: {
                          elevation: 5,
                        },
                      }),
                    }}
                  >
                    <View style={{ marginTop: 10 }}>
                      {authOptions[item.id - 1]}
                    </View>
                  </Animated.View>
                </View>

                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    transform: [{ scale }, { translateY }],
                    opacity,
                  }}
                >
                  <ImageBackground
                    source={item.icon}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Animated.View style={{ opacity: opacityBg }}>
                      <LottieView
                        source={require("../assets/Lottie/iconHighlight.json")}
                        autoPlay
                        loop
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      />
                    </Animated.View>
                  </ImageBackground>
                </Animated.View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
