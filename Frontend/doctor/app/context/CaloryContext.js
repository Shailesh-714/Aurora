import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebaseConfig";
import { AppContext } from "./AppContext";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const CaloryContext = createContext();

const CaloryProvider = ({ children }) => {
  const { exerData, foodData } = useContext(AppContext);
  const [weeklyIntakeCal, setWeeklyIntakeCal] = useState([]);
  const [weeklyBurnedCal, setWeeklyBurnedCal] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDayLabel = (date) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[date.getDay()];
  };

  const fillMissingDays = (data) => {
    const completeData = [];
    const today = new Date();

    // Loop for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = formatDate(date);
      const dayLabel = getDayLabel(date);

      // Find if data exists for this date
      const existingEntry = data.find((entry) => entry.date === formattedDate);
      if (existingEntry) {
        completeData.push(existingEntry);
      } else {
        completeData.push({ value: 0, label: dayLabel, date: formattedDate });
      }
    }
    return completeData;
  };

  const setupWeeklyDataListeners = () => {
    const burnedValuesQuery = query(
      collection(db, "weeklyCalData", auth.currentUser.uid, "BurnedValues"),
      orderBy("date", "desc"),
      limit(7)
    );
    onSnapshot(burnedValuesQuery, (snapshot) => {
      const burnedData = snapshot.docs.map((doc) => doc.data());
      setWeeklyBurnedCal(fillMissingDays(burnedData));
    });

    const intakeValuesQuery = query(
      collection(db, "weeklyCalData", auth.currentUser.uid, "IntakeValues"),
      orderBy("date", "desc"),
      limit(7)
    );
    onSnapshot(intakeValuesQuery, (snapshot) => {
      const intakeData = snapshot.docs.map((doc) => doc.data());
      setWeeklyIntakeCal(fillMissingDays(intakeData));
    });
  };

  const saveDailyBurnedValue = async () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    const dayLabel = getDayLabel(today);

    const docRef = doc(
      db,
      "weeklyCalData",
      auth.currentUser.uid,
      "BurnedValues",
      formattedDate
    );
    const data = {
      value: exerData.calories,
      label: dayLabel,
      date: formattedDate,
    };

    await setDoc(docRef, data, { merge: true });
  };

  const saveDailyIntakeValue = async () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    const dayLabel = getDayLabel(today);

    const docRef = doc(
      db,
      "weeklyCalData",
      auth.currentUser.uid,
      "IntakeValues",
      formattedDate
    );
    const data = {
      value: foodData.calories,
      label: dayLabel,
      date: formattedDate,
    };

    await setDoc(docRef, data, { merge: true });
  };

  useEffect(() => {
    if (!!auth.currentUser) {
      setupWeeklyDataListeners();
      saveDailyIntakeValue();
      saveDailyBurnedValue();
    }
  }, [exerData, foodData, auth.currentUser]);

  return (
    <CaloryContext.Provider value={{ weeklyIntakeCal, weeklyBurnedCal }}>
      {children}
    </CaloryContext.Provider>
  );
};

export { CaloryContext, CaloryProvider };
