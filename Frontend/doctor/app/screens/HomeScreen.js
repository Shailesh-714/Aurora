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
  TouchableO,
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
});
