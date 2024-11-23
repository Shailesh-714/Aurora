import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebaseConfig";
import { UserContext } from "./UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Firestore functions

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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lastResetDate, setLastResetDate] = useState(null);

  const resetData = () => {
    setExerData({ calories: 0, minutes: 0 });
    setFoodData({
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
    });
    setProteinNeed(0);
    setFatNeed(0);
    setCarbNeed(0);
    setCalNeed(0);
    setFiberNeed(0);
    setActivityFactor(1.55);
    setWater(0);
    setWaterNeed(0);
    setSleep(0);
    setMeditation(0);
    setFoodHealth(0);
    setExerciseHealth(0);
    setSkinHealth(0);
    setMentalHealth(0);
    setHealthScore(0);
  };

  // Load data from Firestore
  const loadStoredData = async () => {
    const currentUserId = auth.currentUser ? auth.currentUser.uid : "";
    if (currentUserId) {
      const userDocRef = doc(db, "user_data", currentUserId);
      const today = new Date().toDateString();
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (today === data.lastResetDate) {
            setLastResetDate(data.lastResetDate || new Date().toDateString());
            setActivityFactor(data.activityFactor || 1.55);
            setExerData(data.exerData || { calories: 0, minutes: 0 });
            setFoodData(
              data.foodData || {
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0,
                fiber: 0,
              }
            );
            setWater(data.water || 0);
            setSleep(data.sleep || 0);
            setMeditation(data.meditation || 0);
            setFoodHealth(data.foodHealth || 0);
            setExerciseHealth(data.exerciseHealth || 0);
            setSkinHealth(data.skinHealth || 0);
            setMentalHealth(data.mentalHealth || 0);
            setHealthScore(data.healthScore || 0);
          } else {
            resetData();
            setLastResetDate(today);
          }
        }
      } catch (error) {
        console.error("Error retrieving data from Firestore:", error);
      } finally {
        setDataLoaded(true);
      }
    }
  };

  // Store data to Firestore
  const storeData = async () => {
    const currentUserId = auth.currentUser ? auth.currentUser.uid : "";
    const today = new Date().toDateString();
    if (currentUserId && dataLoaded && today === lastResetDate) {
      const userDocRef = doc(db, "user_data", currentUserId);
      try {
        await setDoc(
          userDocRef,
          {
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
            lastResetDate,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving data to Firestore:", error);
      }
    } else {
      loadStoredData();
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
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
    lastResetDate,
    dataLoaded,
  ]);

  // Load new user's data from Firestore
  const loadNewUserData = async (userId) => {
    const userDocRef = doc(db, "user_data", userId);
    const today = new Date().toDateString();
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (today === data.lastResetDate) {
          setLastResetDate(data.lastResetDate || new Date().toDateString());
          setActivityFactor(data.activityFactor || 1.55);
          setExerData(data.exerData || { calories: 0, minutes: 0 });
          setFoodData(
            data.foodData || {
              calories: 0,
              protein: 0,
              fat: 0,
              carbs: 0,
              fiber: 0,
            }
          );
          setWater(data.water || 0);
          setSleep(data.sleep || 0);
          setMeditation(data.meditation || 0);
          setFoodHealth(data.foodHealth || 0);
          setExerciseHealth(data.exerciseHealth || 0);
          setSkinHealth(data.skinHealth || 0);
          setMentalHealth(data.mentalHealth || 0);
          setHealthScore(data.healthScore || 0);
        } else {
          resetData();
          setLastResetDate(today);
        }
      }
    } catch (error) {
      console.error("Error retrieving data from Firestore:", error);
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadNewUserData(user.uid);
      } else {
        resetData();
      }
    });

    return () => unsubscribe();
  }, []);

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
    const score = parseFloat(
      (Math.min(foodHealth, 1) +
        Math.min(exerciseHealth, 1) +
        Math.min(skinHealth, 1) +
        Math.min(mentalHealth, 1)) /
        4
    ).toFixed(2);
    if (!score || score < 0) {
      setHealthScore(0);
    } else if (score >= 0 && score <= 1) {
      setHealthScore(score);
    } else {
      setHealthScore(1);
    }
  }, [foodHealth, exerciseHealth, skinHealth, mentalHealth]);

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
