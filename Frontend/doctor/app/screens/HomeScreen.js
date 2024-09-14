import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";


const chatList = [
  { id: '1', name: 'Dr. John Doe', value:'psychatrist', description: 'Specialist in Psychiatry', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Dr. Jane Smith',value:'pediatrisian', description: 'Expert Pediatrician', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: '3', name: 'Dr. Mike Johnson',value:'dermatologist', description: 'Experienced Dermatologist', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: '4', name: 'Dr. Sarah Lee',value:'gynaecologist', description: 'Gynaecology Specialist', image: 'https://randomuser.me/api/portraits/women/0.jpg' },
];


const HomeScreen = () => {
  const navigation = useNavigation();
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => navigation.navigate("ChatScreen", { doctor: item })}
    >
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.chatTextContainer}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chatDescription}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title="Home"
        right="more-vertical"
        onRightPress={() => {}}
      />
      
      {/* Chat list */}
      <FlatList
        data={chatList}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1EB",
    gap:15
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  chatDescription: {
    color: "#666",
    fontSize: 14,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});
