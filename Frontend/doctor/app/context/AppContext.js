import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig"; // Firebase config

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [exerData, setExerData] = useState({ calories: 0, minutes: 0 });

  const [userInfo, setUserInfo] = useState({
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
    gender: "",
  });

  const [foodData, setFoodData] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    fiber: 0,
  });

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [proteinNeed, setProteinNeed] = useState(0);
  const [fatNeed, setFatNeed] = useState(0);
  const [carbNeed, setCarbNeed] = useState(0);
  const [calNeed, setCalNeed] = useState(0);
  const [fiberNeed, setFiberNeed] = useState(0);

  // Add state variables for water, sleep, and meditation
  const [water, setWater] = useState(0); // Glasses of water consumed
  const [sleep, setSleep] = useState(0); // Hours of sleep
  const [meditation, setMeditation] = useState(0); // Minutes of meditation

  const calculateBMI = (weight, height) => {
    if (height > 0) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 0;
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (gender.toLowerCase() === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const calculateDailyNeeds = () => {
    const { weight, height, age, gender } = userInfo;

    if (weight > 0 && height > 0 && age > 0 && gender) {
      const bmr = calculateBMR(weight, height, age, gender);
      const activityFactor = 1.375;
      const tdee = (bmr * activityFactor).toFixed(0);

      setCalNeed(tdee);
      setProteinNeed((tdee * 0.2) / 4);
      setFatNeed((tdee * 0.3) / 9);
      setCarbNeed((tdee - tdee * 0.2 - tdee * 0.3) / 4);
      setFiberNeed(30);
    }
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const exerData = await AsyncStorage.getItem("exerData");
        setExerData(JSON.parse(exerData) || { calories: 0, minutes: 0 });

        const foodData = await AsyncStorage.getItem("foodData");
        setFoodData(
          JSON.parse(foodData) || {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            fiber: 0,
          }
        );

        const userInfo = await AsyncStorage.getItem("userInfo");
        const parsedUserInfo = JSON.parse(userInfo || "{}");

        if (parsedUserInfo) {
          parsedUserInfo.bmi = calculateBMI(
            parsedUserInfo.weight,
            parsedUserInfo.height
          );
          setUserInfo(parsedUserInfo);
        }

        const storedProfileImage = await AsyncStorage.getItem("profileImage");
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }

        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          const currentUser = auth.currentUser;
          if (currentUser && currentUser.email) {
            const name = currentUser.email.split("@")[0];
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
            setUsername(formattedName);
            await AsyncStorage.setItem("username", formattedName);
          }
        }

        // Load water, sleep, and meditation from storage if they exist
        const storedWater = await AsyncStorage.getItem("water");
        setWater(parseInt(storedWater) || 0);

        const storedSleep = await AsyncStorage.getItem("sleep");
        setSleep(parseFloat(storedSleep) || 0);

        const storedMeditation = await AsyncStorage.getItem("meditation");
        setMeditation(parseInt(storedMeditation) || 0);
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    if (
      userInfo.age > 0 &&
      userInfo.weight > 0 &&
      userInfo.height > 0 &&
      userInfo.gender
    ) {
      calculateDailyNeeds();
    }
  }, [userInfo]);

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("exerData", JSON.stringify(exerData));
        await AsyncStorage.setItem("foodData", JSON.stringify(foodData));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("profileImage", profileImage);

        // Store water, sleep, and meditation in AsyncStorage
        await AsyncStorage.setItem("water", water.toString());
        await AsyncStorage.setItem("sleep", sleep.toString());
        await AsyncStorage.setItem("meditation", meditation.toString());
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };
    storeData();
  }, [exerData, foodData, userInfo, profileImage, water, sleep, meditation]);

  return (
    <AppContext.Provider
      value={{
        exerData,
        setExerData,
        foodData,
        setFoodData,
        userInfo,
        setUserInfo,
        username,
        setUsername,
        profileImage,
        setProfileImage,
        proteinNeed,
        fatNeed,
        carbNeed,
        calNeed,
        fiberNeed,
        water,
        setWater,
        sleep,
        setSleep,
        meditation,
        setMeditation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
