import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
    gender: "",
  });

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const calculateBMI = (weight, height) => {
    if (height > 0) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 0;
  };

  useEffect(() => {
    const bmi = calculateBMI(userInfo.weight, userInfo.height);
    setUserInfo({ ...userInfo, bmi: bmi });
  }, [userInfo.height, userInfo.weight]);

  useEffect(() => {
    const loadStoredData = async () => {
      const currentUserId = !!auth.currentUser ? auth.currentUser.uid : "";
      try {
        const storedProfileImage = await AsyncStorage.getItem(
          `${currentUserId}profileImage`
        );
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      const currentUserId = !!auth.currentUser ? auth.currentUser.uid : "";
      try {
        await AsyncStorage.setItem(
          `${currentUserId}profileImage`,
          profileImage
        );
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };
    storeData();
  }, [profileImage]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        username,
        setUsername,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
