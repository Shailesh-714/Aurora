import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { BackgroundImage } from "react-native-elements/dist/config";
import ProfileBg from "../assets/images/backgrounds/appScreenBg/profileBg.jpg";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      // Derive username from email
      setUsername(currentUser.email.split("@")[0]);
    }
  }, []);

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigation.navigate("Login");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleEdit = () => {
    alert("Edit profile feature is under development.");
  };

  return (
    <View style={styles.container}>
      <BackgroundImage source={ProfileBg} style={{flex:1}}>
        {user ? (
          <>
            <View style={styles.content}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("../assets/default_profile.png")
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>

              {/* <Text style={styles.username}>Username: {username}</Text>
              <Text style={styles.email}>Email: {user.email}</Text>

              <Button
                title="Edit Details"
                onPress={handleEdit}
                color="#FFC107"
              />
              <Button title="Logout" onPress={handleLogout} color="#8773BB" /> */}
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  content: {
    flex: 1,
    padding: 50,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: "#EEE", 
  },
  changePhotoText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    color: "#888",
  },
});

export default ProfileScreen;
