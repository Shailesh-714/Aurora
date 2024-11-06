import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Progress from "react-native-progress";
import MasonryList from "@react-native-seoul/masonry-list";
import MyHeader from "../components/tab_bar/MyHeader";
import { useNavigation } from "@react-navigation/native";
import { data as initialData } from "../data/ExploreData";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreBg from "../assets/images/backgrounds/appScreenBg/explore.jpg";

// Utility function to shuffle array
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [shuffledData, setShuffledData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [slideAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false); // State for managing loading
  const [progress, setProgress] = useState(0); // Progress state for loading bar

  // Shuffle the data on each render
  React.useEffect(() => {
    setShuffledData(shuffleArray([...initialData]));
  }, []);

  // Function to open the modal with slide-up animation
  const openModal = (url) => {
    setSelectedUrl(url);
    setModalVisible(true);

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const Card = ({ item }) => {
    const randomHeight = [200, 240, 260, 280, 300][
      Math.floor(Math.random() * 5)
    ];

    return (
      <TouchableOpacity
        onPress={() => openModal(item.link)}
        style={styles.cardContainer}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { height: randomHeight }]}
          resizeMode="cover"
        />
        <View style={styles.textCard}>
          <Text numberOfLines={2} style={styles.textStyle}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={ExploreBg}>
      <SafeAreaView style={styles.container}>
        <MyHeader title="Explore" titleColor="#FB706B" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <MasonryList
            data={shuffledData}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Card item={item} />}
            refreshing={false}
          />
          <View
            style={{
              backgroundColor: "transparent",
              borderRadius: 20,
              padding: 30,
              marginBottom: 20,
            }}
          />
        </ScrollView>

        {/* Modal with WebView */}
        <Modal visible={modalVisible} transparent={true} animationType="none">
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1000, 0], // From off-screen to fully visible
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.webviewHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>

            {/* Show the loading bar or activity indicator while loading */}
            {loading && (
              <View style={styles.loadingContainer}>
                <Progress.Bar
                  progress={progress}
                  width={null}
                  color="#007AFF"
                />
              </View>
            )}

            <WebView
              source={{ uri: selectedUrl }}
              style={styles.webview}
              onLoadStart={() => {
                setLoading(true);
                setProgress(0);
              }}
              onLoadProgress={({ nativeEvent }) =>
                setProgress(nativeEvent.progress)
              }
              onLoadEnd={() => setLoading(false)}
            />
          </Animated.View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  scrollview: {
    margin: 5,
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    margin: 5,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  webviewHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    height: 2,
  },
});
