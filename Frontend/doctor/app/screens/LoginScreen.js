import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import { FontAwesome6, AntDesign, Feather } from "@expo/vector-icons";
import shape from "../assets/images/backgrounds/loginbg/shape.png";
import { signUp, login, google } from "../auth/Authentication";
import { useToastBar } from "../context/ToastBarContext";
import { AuthOptions, loginOptionList } from "../data/OptionsData";
import RenderLogin from "../components/login/RenderLogin";
import RenderBackgrounds from "../components/login/RenderBackgrounds";

const ITEM_SIZE = Platform.OS === "ios" ? width : width;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const LoginScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPwd, setShowPwd] = React.useState(true);
  const { showToastBar } = useToastBar();

  const handleAuth = async (action) => {
    if (action === "Register") {
      const result = await signUp(registerEmail, registerPassword);
      if (result.success) {
        showToastBar(
          "Registerd!",
          "You have successfully registered your account",
          3000,
          "green"
        );
      } else if (result.error) {
        showToastBar("SignUp Error", `${result.error}`, 3000, "red");
      }
    } else if (action === "Login") {
      const result = await login(email, password);
      if (result.success) {
        showToastBar(
          "SignIn Successfull",
          "You have successfully signed into your account",
          3000,
          "green"
        );
      } else if (result.error) {
        showToastBar("Login Error", `${result.error}`, 3000, "red");
      }
    } else if (action === "Google") {
      const result = await google();
      if (result.success) {
        showToastBar(
          "SignIn Google",
          "You have successfully signed into your account",
          3000,
          "green"
        );
      } else if (result.error) {
        showToastBar("Google Error", `${result.error}`, 3000, "red");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", minHeight: height }}>
      <RenderBackgrounds loginOptionList={loginOptionList} scrollX={scrollX} />

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={loginOptionList}
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
                {/*quotes section */}
                <Animated.View
                  style={{
                    width: width * 0.9,
                    alignSelf: "center",
                    alignItems: "center",
                    opacity: opacityBg,
                    paddingBottom: height * 0.08,
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
                </Animated.View>

                {/*login container section */}
                <Animated.View
                  style={{
                    maxHeight: height * 0.2,
                    minHeight: height * 0.2,
                    justifyContent: "center",
                    transform: [{ scale: scaleLog }],
                  }}
                >
                  {/*login label*/}
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

                  {/*login content */}
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
                      {AuthOptions[item.id - 1].label === "Login" ||
                      AuthOptions[item.id - 1].label === "Register" ? (
                        <View style={styles.container}>
                          <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Email</Text>
                            <TextInput
                              value={
                                AuthOptions[item.id - 1].label === "Login"
                                  ? email
                                  : registerEmail
                              }
                              onChangeText={(text) => {
                                AuthOptions[item.id - 1].label === "Login"
                                  ? setEmail(text)
                                  : setRegisterEmail(text);
                              }}
                              placeholder="Enter your email"
                              placeholderTextColor="rgba(0,0,0,0.5)"
                              style={styles.inputText}
                            />
                          </View>
                          <View
                            style={[
                              styles.inputContainer,
                              styles.inputContainerSmallGap,
                            ]}
                          >
                            <Text style={styles.labelText}>Password</Text>
                            <TextInput
                              value={
                                AuthOptions[item.id - 1].label === "Login"
                                  ? password
                                  : registerPassword
                              }
                              onChangeText={(text) => {
                                AuthOptions[item.id - 1].label === "Login"
                                  ? setPassword(text)
                                  : setRegisterPassword(text);
                              }}
                              secureTextEntry={showPwd}
                              placeholder="Password"
                              placeholderTextColor="rgba(0,0,0,0.5)"
                              style={styles.inputText}
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
                          <TouchableOpacity
                            onPress={() =>
                              handleAuth(AuthOptions[item.id - 1].label)
                            }
                          >
                            <View style={styles.buttonContainer}>
                              <Text style={styles.buttonText}>
                                {AuthOptions[item.id - 1].label}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.authContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              handleAuth(AuthOptions[item.id - 1].label)
                            }
                            style={styles.socialButton}
                          >
                            <Image
                              source={item.icon}
                              style={styles.socialIcon}
                            />
                            <Text style={styles.socialButtonText}>
                              SignIn with {AuthOptions[item.id - 1].label}{" "}
                              Account
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                              By signing up, you agree to our{" "}
                              <Text style={styles.termsLink}>
                                Terms of Service
                              </Text>{" "}
                              and{" "}
                              <Text style={styles.termsLink}>
                                Privacy Policy
                              </Text>
                              .
                            </Text>
                          </View>
                        </View>
                      )}
                      {/* {authOptions[item.id - 1]} */}
                    </View>
                  </Animated.View>
                </Animated.View>
              </View>
            </Animated.View>
          );
        }}
      />
      <RenderLogin loginOptionList={loginOptionList} scrollX={scrollX} />
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

const styles = StyleSheet.create({
  container: {
    minWidth: "85%",
    paddingTop: "4%",
    paddingBottom: "3%",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ccc",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingVertical: 3,
    paddingHorizontal: "4%",
    marginBottom: 10,
    alignItems: "center",
    gap: 10,
  },
  inputContainerSmallGap: {
    marginBottom: 5,
    maxWidth: "100%",
  },
  labelText: {
    fontSize: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    paddingHorizontal: 5,
    position: "absolute",
    top: -7,
    left: 10,
    zIndex: 10,
  },
  inputText: {
    flex: 1,
    color: "black",
    fontWeight: "500",
  },
  buttonContainer: {
    backgroundColor: "#A6B0F2",
    alignItems: "center",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  authContainer: {
    maxWidth: "90%",
    minWidth: "90%",
  },
  socialButton: {
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
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  socialButtonText: {
    fontWeight: "500",
    letterSpacing: 1,
  },
  termsContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  termsText: {
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: "#008FFF",
  },
});
export default LoginScreen;
