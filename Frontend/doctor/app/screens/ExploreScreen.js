import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";
import { data } from "../data/ExploreData";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const Card = ({ item }) => {
    const randomBool = Math.random() < 0.5;
    return (
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
          height={randomBool ? 180 : 240}
        />
        <View style={styles.textCard}>
          <Text numberOfLines={2} style={styles.textStyle}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title="Explore"
        right="more-vertical"
        onRightPress={() => {}}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
        <MasonryList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Card item={item} />}
          refreshing={false}
        />
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1EB",
    gap:5
  },
  scrollview:{
    margin:5
  },
  cardContainer: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: "white",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    alignSelf: "stretch",
    borderRadius: 10,
  },
  textCard: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "500",
  },
});
