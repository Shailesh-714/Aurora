import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  FlatList,
  useWindowDimensions,
  Linking,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery !== "") {
      navigation.navigate("SearchResult", { searchQuery });
    }
  };
  const ill = [
    {
      source: require("../assets/images/ill_tips/cold.jpg"),
      link: "https://my.clevelandclinic.org/health/diseases/12342-common-cold",
    },
    {
      source: require("../assets/emologo.png"),
      link: "https://github.com/Shailesh-714",
    },
    {
      source: require("../assets/emologo.png"),
      link: "https://github.com/Shailesh-714",
    },
  ];

  const handlePress = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View>
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <Pressable style={styles.search}>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#a6a6a6" />
          </TouchableOpacity>

          <TextInput
            placeholder="Search "
            placeholderTextColor={"#a6a6a6"}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
            style={[
              styles.text,
              { marginLeft: 10, fontWeight: "500", width: "80%" },
            ]}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Everyday health</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ill.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item.link)}
              >
                <Image source={item.source} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Body & Soul</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ill.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item.link)}
              >
                <Image source={item.source} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Critical Care Corner
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ill.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item.link)}
              >
                <Image source={item.source} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Talk to Us</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    padding: 10,
    width: "90%",
    borderRadius: 50,

    backgroundColor: "#ededed",

    marginBottom: 15,
  },
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    paddingBottom: 170,
  },
  image: {
    width: 130,
    height: 130,
    marginTop: 15,
    marginRight: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
