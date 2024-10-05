import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Initialize exerData as an object with default values for calories and minutes
  const [exerData, setExerData] = useState({ calories: 0, minutes: 0 });

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("exerData");
        if (storedData !== null) {
          setExerData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("exerData", JSON.stringify(exerData));
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };

    if (exerData !== null) {
      storeData();
    }
  }, [exerData]);

  return (
    <AppContext.Provider value={{ exerData, setExerData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
