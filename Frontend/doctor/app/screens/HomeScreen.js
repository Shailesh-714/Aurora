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
  ImageBackground,
  Linking,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ill } from "../data/IllData";
import { doc } from "../data/DocData";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery !== "") {
      navigation.navigate("SearchResult", { searchQuery });
    }
  };

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
        <View style={{ flex: 1, marginVertical: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Everyday health</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={ill}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.link)}>
                  <ImageBackground source={item.source} style={styles.image}>
                    <Text style={styles.imageText}>{item.label}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              pagingEnabled={true}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginVertical: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Body & Soul</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={ill}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.link)}>
                  <ImageBackground source={item.source} style={styles.image}>
                    <Text style={styles.imageText}>{item.label}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              pagingEnabled={true}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginVertical: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Critical Care Corner
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={ill}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.link)}>
                  <ImageBackground source={item.source} style={styles.image}>
                    <Text style={styles.imageText}>{item.label}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              pagingEnabled={true}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 1, margin: 10, flexDirection: "column", gap: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Talk to Us</Text>
          {doc.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate("ChatScreen", { doc: item })}
            >
              <View
                style={{
                  width: "100%",

                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image
                    source={item.image}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 60,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      paddingLeft: 10,
                    }}
                  >
                    <Text numberOfLines={3} style={{ fontWeight: 600 }}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={9}
                      style={{ fontSize: 12, paddingTop: 5 }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 170,
  },
  image: {
    width: 160,
    height: 200,
    marginTop: 15,
    marginLeft: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  imageText: {
    position: "absolute",
    bottom: 1,
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    padding: 3,
    paddingHorizontal: 7,
  },
});
