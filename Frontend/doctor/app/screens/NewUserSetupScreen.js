import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useToastBar } from "../context/ToastBarContext";
import { UserContext } from "../context/UserContext";

const { width, height } = Dimensions.get("window");

const NewUserSetupScreen = ({ onComplete }) => {
  const { setUserInfo, setUsername } = useContext(UserContext);
  const scrollRef = useRef(null);
  const inputRefs = useRef([]); // Add ref array for input fields
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to hold input values
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(0); // State to hold BMI

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (weight > 0 && height > 0) {
      return (weight / (height / 100) ** 2).toFixed(1);
    }
    return 0;
  };

  // Update BMI whenever weight or height changes
  useEffect(() => {
    const calculatedBmi = calculateBMI(parseFloat(weight), parseFloat(height));
    setBmi(calculatedBmi);
  }, [weight, height]);

  const sections = [
    {
      title: "Enter your username",
      placeholder: "Username",
      value: userName,
      setValue: setUserName,
    },
    {
      title: "Enter your age",
      placeholder: "Age",
      keyboardType: "numeric",
      value: age,
      setValue: setAge,
    },
    {
      title: "Select your gender",
      isGender: true,
      value: gender,
      setValue: setGender,
    },
    {
      title: "Enter your height (in cm)",
      placeholder: "Height",
      keyboardType: "numeric",
      value: height,
      setValue: setHeight,
    },
    {
      title: "Enter your weight (in kg)",
      placeholder: "Weight",
      keyboardType: "numeric",
      value: weight,
      setValue: setWeight,
    },
  ];

  // Handle focus when section changes
  useEffect(() => {
    if (inputRefs.current[currentIndex] && !sections[currentIndex].isGender) {
      inputRefs.current[currentIndex].focus();
    }
  }, [currentIndex]);

  const handleScroll = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < sections.length) {
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({ x: newIndex * width, animated: true });
    }
  };

  const { showToastBar } = useToastBar();
  const handleFinish = async () => {
    if (!userName || !age || !gender || !height || !weight) {
      showToastBar(
        `Missing Fields!`,
        "Please fill all the necessary fields to proceed",
        3000,
        "red"
      );
    } else {
      setUsername(userName);
      setUserInfo({
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        bmi: bmi,
      });
      try {
        const userData = {
          userName,
          age,
          gender,
          height,
          weight,
          bmi,
        };
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userDocRef, userData);
        showToastBar(
          `Profile updated!`,
          "Your profile has been successfully updated",
          3000,
          "green"
        );
        onComplete();
      } catch (error) {
        console.error("Error saving user details: ", error);
        showToastBar(`Error!`, "An error occurred in the process", 3000, "red");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Buttons at the Top */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          {currentIndex > 0 ? (
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => handleScroll(-1)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          {currentIndex < sections.length - 1 ? (
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => handleScroll(1)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={handleFinish}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.dotContainer}>
          {sections.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Scrollable Sections */}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pointerEvents="box-none"
        style={styles.scrollView}
      >
        {sections.map((section, index) => (
          <View key={index} style={[styles.section, { width }]}>
            <Text style={styles.title}>{section.title}</Text>
            {section.isButton ? (
              <Button title={section.buttonTitle} onPress={() => {}} />
            ) : section.isGender ? (
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    { borderColor: gender === "Male" ? "white" : "#615B81" },
                  ]}
                  onPress={() => setGender("Male")}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      { color: gender === "Male" ? "white" : "#615B81" },
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    { borderColor: gender === "Female" ? "white" : "#615B81" },
                  ]}
                  onPress={() => setGender("Female")}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      { color: gender === "Female" ? "white" : "#615B81" },
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    { borderColor: gender === "Other" ? "white" : "#615B81" },
                  ]}
                  onPress={() => setGender("Other")}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      { color: gender === "Other" ? "white" : "#615B81" },
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.input}
                placeholderTextColor="#615B81"
                placeholder={section.placeholder}
                keyboardType={section.keyboardType || "default"}
                value={section.value}
                onChangeText={section.setValue}
              />
            )}
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130E25",
  },
  buttonContainer: {
    backgroundColor: "#211842",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    alignItems: "center",
    paddingVertical: height * 0.25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1.5,
    borderColor: "#615B81",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "90%",
    marginVertical: 10,
    borderRadius: 5,
    color: "white",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1.5,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center text
  },
  dotContainer: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 25,
    zIndex: 2,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    height: 8,
    width: 8,
    backgroundColor: "#615B81",
  },
});
export default NewUserSetupScreen;
