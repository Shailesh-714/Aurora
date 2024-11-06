import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";
import { UserContext } from "./UserContext";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [exerData, setExerData] = useState({ calories: 0, minutes: 0 });
  const [foodData, setFoodData] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    fiber: 0,
  });
  const [proteinNeed, setProteinNeed] = useState(0);
  const [fatNeed, setFatNeed] = useState(0);
  const [carbNeed, setCarbNeed] = useState(0);
  const [calNeed, setCalNeed] = useState(0);
  const [fiberNeed, setFiberNeed] = useState(0);
  const [activityFactor, setActivityFactor] = useState(1.55);
  const [water, setWater] = useState(0);
  const [waterNeed, setWaterNeed] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [meditation, setMeditation] = useState(0);
  const [foodHealth, setFoodHealth] = useState(0);
  const [exerciseHealth, setExerciseHealth] = useState(0);
  const [skinHealth, setSkinHealth] = useState(0);
  const [mentalHealth, setMentalHealth] = useState(0);
  const [healthScore, setHealthScore] = useState(0);

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
      const tdee = (bmr * activityFactor).toFixed(0);

      setCalNeed(tdee);
      setProteinNeed((tdee * 0.2) / 4);
      setFatNeed((tdee * 0.3) / 9);
      setCarbNeed((tdee - tdee * 0.2 - tdee * 0.3) / 4);
      setFiberNeed(30);

      const dailyWaterInMl = bmr;
      const glassesOfWater = Math.ceil(dailyWaterInMl / 250);
      setWaterNeed(glassesOfWater);
    }
  };

  useEffect(() => {
    const loadStoredData = async () => {
      const currentUserId = !!auth.currentUser ? auth.currentUser.uid : "";
      try {
        const activityFactorData = await AsyncStorage.getItem(
          `${currentUserId}activityFactor`
        );
        setActivityFactor(parseFloat(activityFactorData) || 1.55);
        const exerData = await AsyncStorage.getItem(`${currentUserId}exerData`);
        setExerData(JSON.parse(exerData) || { calories: 0, minutes: 0 });

        const foodData = await AsyncStorage.getItem(`${currentUserId}foodData`);
        setFoodData(
          JSON.parse(foodData) || {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            fiber: 0,
          }
        );

        const storedWater = await AsyncStorage.getItem(`${currentUserId}water`);
        setWater(parseInt(storedWater) || 0);

        const storedSleep = await AsyncStorage.getItem(`${currentUserId}sleep`);
        setSleep(parseFloat(storedSleep) || 0);

        const storedMeditation = await AsyncStorage.getItem(
          `${currentUserId}meditation`
        );
        setMeditation(parseInt(storedMeditation) || 0);

        const storedFoodHealth = await AsyncStorage.getItem(
          `${currentUserId}foodHealth`
        );
        setFoodHealth(parseFloat(storedFoodHealth).toFixed(1) || 0);

        const storedExerciseHealth = await AsyncStorage.getItem(
          `${currentUserId}exerciseHealth`
        );
        setExerciseHealth(parseFloat(storedExerciseHealth).toFixed(1) || 0);

        const storedSkinHealth = await AsyncStorage.getItem(
          `${currentUserId}skinHealth`
        );
        setSkinHealth(parseFloat(storedSkinHealth).toFixed(1) || 0);

        const storedMentalHealth = await AsyncStorage.getItem(
          `${currentUserId}mentalHealth`
        );
        setMentalHealth(parseFloat(storedMentalHealth).toFixed(1) || 0);
        const storedHealthScore = await AsyncStorage.getItem(
          `${currentUserId}healthScore`
        );
        setHealthScore(parseFloat(storedHealthScore).toFixed(1) || 0);
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
  }, [userInfo, activityFactor]);

  const calculateFoodHealth = () => {
    const calorieScore = foodData.calories / calNeed;
    const proteinScore = foodData.protein / proteinNeed;
    const fatScore = foodData.fat / fatNeed;
    const carbScore = foodData.carbs / carbNeed;
    const fiberScore = foodData.fiber / fiberNeed;
    setFoodHealth(
      parseFloat(
        (
          (calorieScore + proteinScore + fatScore + carbScore + fiberScore) /
          5
        ).toFixed(2)
      ) || 0
    );
  };

  const calculateExerciseHealth = () => {
    const { weight, height, age, gender } = userInfo;
    const bmr = calculateBMR(weight, height, age, gender);
    const dailyCalorieGoal = bmr * activityFactor;
    const calorieScore = exerData.calories / Math.round(dailyCalorieGoal);
    setExerciseHealth(parseFloat(calorieScore.toFixed(2)) || 0);
  };

  const calculateSkinHealth = () => {
    const waterScore = water / waterNeed;
    setSkinHealth(parseFloat(waterScore.toFixed(2)) || 0);
  };

  const calculateMentalHealth = () => {
    const sleepScore = sleep / 8;
    const meditationScore = Math.min(meditation / 20, 1);
    setMentalHealth(
      parseFloat(((sleepScore + meditationScore) / 2).toFixed(2)) || 0
    );
  };

  useEffect(() => {
    calculateFoodHealth();
    calculateExerciseHealth();
    calculateSkinHealth();
    calculateMentalHealth();
  }, [
    foodData,
    exerData,
    water,
    sleep,
    meditation,
    calNeed,
    proteinNeed,
    fatNeed,
    carbNeed,
  ]);

  useEffect(() => {
    setHealthScore(
      parseFloat(
        ((foodHealth + exerciseHealth + skinHealth + mentalHealth) / 4).toFixed(
          2
        )
      )
    );
  }, [foodHealth, exerciseHealth, skinHealth, mentalHealth]);

  useEffect(() => {
    const storeData = async () => {
      const currentUserId = !!auth.currentUser ? auth.currentUser.uid : "";
      try {
        await AsyncStorage.setItem(
          `${currentUserId}activityFactor`,
          activityFactor.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}exerData`,
          JSON.stringify(exerData)
        );
        await AsyncStorage.setItem(
          `${currentUserId}foodData`,
          JSON.stringify(foodData)
        );

        await AsyncStorage.setItem(`${currentUserId}water`, water.toString());
        await AsyncStorage.setItem(`${currentUserId}sleep`, sleep.toString());
        await AsyncStorage.setItem(
          `${currentUserId}meditation`,
          meditation.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}foodHealth`,
          foodHealth.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}exerciseHealth`,
          exerciseHealth.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}skinHealth`,
          skinHealth.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}mentalHealth`,
          mentalHealth.toString()
        );
        await AsyncStorage.setItem(
          `${currentUserId}healthScore`,
          healthScore.toString()
        );
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };
    storeData();
  }, [
    activityFactor,
    exerData,
    foodData,
    water,
    sleep,
    meditation,
    foodHealth,
    exerciseHealth,
    skinHealth,
    mentalHealth,
    healthScore,
  ]);

  return (
    <AppContext.Provider
      value={{
        exerData,
        setExerData,
        foodData,
        setFoodData,
        proteinNeed,
        fatNeed,
        carbNeed,
        calNeed,
        fiberNeed,
        water,
        setWater,
        waterNeed,
        sleep,
        setSleep,
        meditation,
        setMeditation,
        activityFactor,
        setActivityFactor,
        foodHealth,
        exerciseHealth,
        skinHealth,
        mentalHealth,
        healthScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
