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
  Alert,
} from "react-native";
import { useAnimatedRef } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import {
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import shape from "../assets/images/backgrounds/loginbg/shape.png";
import { signUp, login, google } from "../auth/Authentication";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width : width;
const ICON_SIZE = width * 0.35;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const EMPTY_ICON_SIZE = (width - ICON_SIZE) / 2;

const RenderLogin = ({ optionList, scrollX }) => {
  const flatListRef = useAnimatedRef();

  React.useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: value * 0.35,
          animated: false,
        });
      }
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [scrollX]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        maxHeight: width * (700 / 1080),
        minHeight: width * (700 / 1080),
      }}
    >
      <Animated.FlatList
        ref={flatListRef}
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
        snapToInterval={ICON_SIZE}
        snapToAlignment="start"
        // Remove the onScroll prop as we are controlling scroll programmatically
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.icon) {
            return <View style={{ width: EMPTY_ICON_SIZE }} />;
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
            <Animated.View
              style={{
                width: ICON_SIZE,
                padding: 10,
                justifyContent: "space-around",
              }}
            >
              <View>
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
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const LoginScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPwd, setShowPwd] = React.useState(true);
  const [err, setErr] = React.useState();
  const [errMsg, setErrMsg] = React.useState();

  const handleAuth = async (action) => {
    const result = await action(email, password);

    if (result.success) {
      Alert.alert(result.success);
    } else if (result.error) {
      setErrMsg(result.error)
      switch(action){
        case signUp:
          setErr("signup")
          break
        case login:
          setErr("login")
          break
        default:
          Alert.alert(result.error);
      }
    }
  };

  const optionList = [
    { id: 0 },
    {
      id: 1,
      name: "Register",
      icon: require("../assets/images/icons/register.png"),
      bg: require("../assets/images/backgrounds/loginbg/bg1.png"),
      tips: "Stay Hydrated: Drinking enough water supports digestion, circulation, and temperature regulation.",
    },
    {
      id: 2,
      name: "Login",
      icon: require("../assets/images/icons/login.png"),
      bg: require("../assets/images/backgrounds/loginbg/bg2.png"),
      tips: "Get Regular Checkups: Early detection of health issues can lead to more effective treatment.",
    },
    {
      id: 3,
      name: "Google",
      icon: require("../assets/images/icons/google.png"),
      bg: require("../assets/images/backgrounds/loginbg/bg3.png"),
      tips: "Eat the Rainbow: A variety of colorful fruits and vegetables provides essential vitamins and antioxidants.",
    },
    {
      id: 4,
      name: "Facebook",
      icon: require("../assets/images/icons/facebook.png"),
      bg: require("../assets/images/backgrounds/loginbg/bg4.png"),
      tips: "Wash Your Hands: Proper hand hygiene can prevent the spread of infections and illness.",
    },
    {
      id: 5,
      name: "Twitter X",
      icon: require("../assets/images/icons/twitter-x.png"),
      bg: require("../assets/images/backgrounds/loginbg/bg5.png"),
      tips: "Prioritize Sleep: Quality sleep is vital for immune function, mental clarity, and overall health.",
    },
    { id: 6 },
  ];

  const authOptions = [
    <View style={{ minWidth: "85%", paddingTop: "4%", paddingBottom: "3%" }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          paddingVertical: 3,
          paddingHorizontal: "4%",
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ flex: 1, color: "black" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          paddingVertical: 3,
          paddingHorizontal: "4%",
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
          maxWidth: "100%",
        }}
      >
        <MaterialCommunityIcons name="key-outline" size={24} color="black" />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPwd}
          placeholder="password"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ flex: 1, color: "black" }}
        />
        {showPwd ? (
          <Feather
            name="eye-off"
            size={17}
            color="black"
            onPress={() => setShowPwd(false)}
          />
        ) : (
          <Feather
            name="eye"
            size={17}
            color="black"
            onPress={() => setShowPwd(true)}
          />
        )}
      </View>
      <TouchableOpacity onPress={() => handleAuth(signUp)}>
        <View
          style={{
            backgroundColor: "#A6B0F2",
            alignItems: "center",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Register
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 3 }}>
        <Text style={{ textAlign: "center", fontSize: 12, letterSpacing: 1.1 }}>
          Already a member?
          <Text style={{ color: "#008FFF" }}> Login!</Text>
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={{ minWidth: "85%", paddingTop: "4%", paddingBottom: "3%" }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          paddingVertical: 3,
          paddingHorizontal: "4%",
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
        }}
      >
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ flex: 1, color: "black" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#f3f3f3",
          paddingVertical: 3,
          paddingHorizontal: "4%",
          marginBottom: 5,
          alignItems: "center",
          gap: 10,
          maxWidth: "100%",
        }}
      >
        <MaterialCommunityIcons name="key-outline" size={24} color="black" />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPwd}
          placeholder="password"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={{ flex: 1, color: "black" }}
        />
        {showPwd ? (
          <Feather
            name="eye-off"
            size={17}
            color="black"
            onPress={() => setShowPwd(false)}
          />
        ) : (
          <Feather
            name="eye"
            size={17}
            color="black"
            onPress={() => setShowPwd(true)}
          />
        )}
      </View>
      <TouchableOpacity onPress={() => handleAuth(login)}>
        <View
          style={{
            backgroundColor: "#A6B0F2",
            alignItems: "center",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 3 }}>
        <Text style={{ textAlign: "center", fontSize: 12, letterSpacing: 1.1 }}>
          New User?
          <Text style={{ color: "#008FFF" }}> Create an Account</Text>
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={{ maxWidth: "90%", minWidth: "90%" }}>
      <TouchableOpacity
        onPress={() => handleAuth(handleGoogleLogin)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: 100,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
          backgroundColor: "white",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
            },
            android: {
              elevation: 2.5,
            },
          }),
        }}
      >
        <Image source={optionList[3].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Google Account
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
    <View style={{ maxWidth: "90%", minWidth: "90%" }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: 100,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
          backgroundColor: "white",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
            },
            android: {
              elevation: 2.5,
            },
          }),
        }}
      >
        <Image source={optionList[4].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Facebook Account
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
    <View style={{ maxWidth: "90%", minWidth: "90%" }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderWidth: 1,
          borderColor: "#f2f2f2",
          borderRadius: 100,
          paddingVertical: 5,
          paddingHorizontal: 15,
          gap: 10,
          backgroundColor: "white",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
            },
            android: {
              elevation: 2.5,
            },
          }),
        }}
      >
        <Image source={optionList[5].icon} style={{ width: 30, height: 30 }} />
        <Text style={{ fontWeight: "500", letterSpacing: 1 }}>
          SignIn with Twitter X Account
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 12, letterSpacing: 1, lineHeight: 18 }}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#008FFF" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#008FFF" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>,
  ];

  const renderBackgrounds = () => {
    return optionList
      .filter((item) => item.bg)
      .map((item, index) => {
        const inputRange = [
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
          (index + 1) * ITEM_SIZE,
        ];

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-width, 0, width],
          extrapolate: "clamp",
        });

        return (
          <Animated.Image
            key={`bg-${index}`}
            source={item.bg}
            style={{
              position: "absolute",
              width: width,
              height: height,
              transform: [{ translateX }],
              zIndex: -3,
            }}
            resizeMode="cover"
          />
        );
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", minHeight: height }}>
      {renderBackgrounds()}

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

          const opacityBg = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });
          const scaleLog = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                minHeight: height,
              }}
            >
              <View
                style={{
                  maxHeight: height - width * (700 / 1080),
                  minHeight: height - width * (700 / 1080),
                  justifyContent: "space-around",
                  paddingTop: height * 0.02,
                  paddingBottom: height * 0.08,
                }}
              >
                <Animated.View
                  style={{
                    width: width * 0.9,
                    alignSelf: "center",
                    alignItems: "center",
                    opacity: opacityBg,
                  }}
                >
                  <FontAwesome6
                    name="quote-left"
                    size={24}
                    color="rgba(0,0,0,1)"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,0.7)",
                      fontSize: 16,
                      fontWeight: "600",
                      paddingTop: height * 0.01,
                    }}
                  >
                    {item.tips}
                  </Text>
                  <AntDesign name="minus" size={35} color="black" />
                </Animated.View>
                <Animated.View
                  style={{
                    maxHeight: height * 0.2,
                    minHeight: height * 0.2,
                    justifyContent: "center",
                    transform: [{ scale: scaleLog }],
                  }}
                >
                  <Animated.View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: 7,
                      paddingHorizontal: 15,
                      borderRadius: 50,
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      top: 16,
                      opacity: opacityBg,
                      ...Platform.select({
                        ios: {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
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
                  <Animated.View
                    style={{
                      width: width * 0.85,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                      borderRadius: 20,
                      paddingTop: 15,
                      paddingBottom: 15,
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
                </Animated.View>
              </View>
            </Animated.View>
          );
        }}
      />
      <RenderLogin optionList={optionList} scrollX={scrollX} />
      <Image
        source={shape}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: width,
          maxHeight: width * (700 / 1080),
          minHeight: width * (700 / 1080),
          bottom: 0,
          zIndex: -2,
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
