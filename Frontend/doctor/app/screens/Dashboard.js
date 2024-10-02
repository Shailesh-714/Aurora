import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const chatList = [
  {
    id: "1",
    name: "Dr. John Doe",
    value: "psychatrist",
    description: "Specialist in Psychiatry",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Dr. Jane Smith",
    value: "pediatrisian",
    description: "Expert Pediatrician",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "3",
    name: "Dr. Mike Johnson",
    value: "dermatologist",
    description: "Experienced Dermatologist",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "4",
    name: "Dr. Sarah Lee",
    value: "gynaecologist",
    description: "Gynaecology Specialist",
    image: "https://randomuser.me/api/portraits/women/0.jpg",
  },
];

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title="Activity"
        right="more-vertical"
        onRightPress={() => {}}
      />

      <ScrollView>
        <View style={{margin:20}}>
        <View
          style={{ backgroundColor: "white", borderRadius: 20, padding: 20,   }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Dashboard</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
             <View style={{}}><Text style={{fontSize:10, padding:"1%", fontWeight:500, color:"#888"}}>Food</Text>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.4}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View></View>
               <View style={{}}><Text style={{fontSize:10, padding:"1%", fontWeight:500, color:"#888"}}>Mental</Text>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>

              <Progress.Bar
                progress={0.3}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View></View>
               <View style={{}}><Text style={{fontSize:10, padding:"1%", fontWeight:500, color:"#888" }}>Skin</Text>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>

              <Progress.Bar
                progress={0.8}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View></View>
               <View style={{}}><Text style={{fontSize:10, padding:"1%", fontWeight:500, color:"#888" }}>Exercise</Text>
              <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>

              <Progress.Bar
                progress={0.1}
                borderWidth={0}
                color={"#5BB2D0"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View></View>
            </View>
            <View
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }}
>
  <Progress.Circle
    size={100}
    progress={0.7}
    borderWidth={0}
    thickness={7}
    color="#F14C6E"
    strokeCap="round"
    showsText={false}  
  />
  
  {}
  <View
    style={{
      position: "absolute",
      alignItems: "center",
    }}
  >
    {}
    <Text
      style={{
        fontSize: 20,  
        fontWeight: "bold",
        color: "#F14C6E", 
      }}
    >
      {`${0.7 * 100}%`}
    </Text>

    {}
    <Text
      style={{
        fontSize: 12,  
        color: "#888",  
        marginTop: 2,   
      }}
    >
      Health
    </Text>
  </View>
</View>

          </View>
        </View>
        <View style={{flexDirection:"row", gap:20, marginVertical:20}}>
          <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20,  flex:1}}>
          <View>
          <View style={{marginBottom:5}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Steps</Text>
          </View>
          <View style={{marginBottom:5, flexDirection:"row", alignItems:"center"}}>
          <MaterialCommunityIcons name="shoe-sneaker" size={30} color="#F27559"/>
            <Text style={{marginHorizontal:10, fontSize:17, fontWeight: "500"}}>4668</Text>
          </View>
          <View style={{marginBottom:10}}>
            <Text style={{fontSize:11}}>Goal: 10,000</Text>
          </View>

          <View style={{alignItems:"flex-start"}}>
          <View style={{backgroundColor:"#f2f2f2", borderRadius:50}}>
              <Progress.Bar
                progress={0.4}
                width={125}
                borderWidth={0}
                color={"#F27559"}
                animated={true}
                animationConfig={{ bounciness: 1 }}
              /></View>
              </View>
          </View>
          </View>
          <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20, flex:1}}>
            <View></View>
            <View></View>
            <View></View>

          </View>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1EB",
    gap: 15,
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
