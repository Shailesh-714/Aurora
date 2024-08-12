import {
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const ChatScreen = () => {
  const screenWidth = useWindowDimensions().width;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    try {
      const prompt = inputText;
      if (inputText.trim().length > 0) {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(),role:"user", text: inputText, timestamp: timestamp },
        ]);
        setInputText("");
        scrollToEnd();

        const prevHist = await AsyncStorage.getItem("history");
        const chatHist = prevHist ? JSON.parse(prevHist) : [];
        chatHist.push({"role":"user","content":prompt});
        const response = await axios.post(
          "https://artistic-sunbird-actively.ngrok-free.app/api/chat",
          {
            model: "psychatrist",
            messages: [{"role":"user", "content":prompt}],
            stream: false,
          }
        );
        const botMessage = response?.data?.message?.content
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), role: "assistant",text: botMessage, timestamp: timestamp },
        ]);
        chatHist.push({"role":"assistant","content":botMessage})
        await AsyncStorage.setItem("history", JSON.stringify(chatHist));
        console.log(chatHist)
        scrollToEnd();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToEnd(); // Scroll to the end when the component first mounts or when messages change
  }, [messages]);

  const renderMessage = ({ item, index }) => {
    // Check if the message is a user message or default
    const isUserMessage = item.role==="user";

    // Generate a timestamp for every message
    const timestamp = item.timestamp
      ? item.timestamp
      : new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

    return (
      <View>
        {shouldDisplayTimestamp(index) && (
          <Text style={styles.timestampText}>{timestamp}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            isUserMessage ? styles.userMessage : styles.defaultMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUserMessage
                ? styles.userMessageText
                : styles.defaultMessageText,
            ]}
          >
            {item.text}
          </Text>
          <View
            style={[
              styles.bubbleTail,
              isUserMessage ? styles.userBubbleTail : styles.defaultBubbleTail,
            ]}
          />
        </View>
      </View>
    );
  };

  const shouldDisplayTimestamp = (currentIndex) => {
    if (currentIndex === 0) return true; // Always show timestamp for the first message

    const currentTimestamp = messages[currentIndex].timestamp;
    const previousTimestamp = messages[currentIndex - 1].timestamp;

    return currentTimestamp !== previousTimestamp;
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          minWidth: screenWidth,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/emologo.png")}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "500",
              marginRight: 10,
              paddingLeft: 5,
            }}
          >
            Emo
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            position: "absolute",
            left: screenWidth * 0.05,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../assets/chat-back.png")} // Replace with your background image
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={scrollToEnd} // Ensure it scrolls to the end when content size changes
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message"
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Feather name="send" size={24} color="#48948a" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2.5%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // This will ensure the image covers the entire background
  },
  messageContainer: {
    padding: "2.5%",
    borderRadius: 20,
    marginVertical: "1%",
    position: "relative",
  },
  defaultMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    width: "85%",
  },
  userMessage: {
    backgroundColor: "#74b9b0",
    alignSelf: "flex-end",
    maxWidth: "85%",
  },
  messageText: {
    fontSize: 16,
  },
  defaultMessageText: {
    color: "black",
  },
  userMessageText: {
    color: "white",
  },
  timestampText: {
    fontSize: 12,
    color: "black",
    alignSelf: "center",
    marginBottom: 2,
    paddingTop: "5%",
  },
  inputContainer: {
    flexDirection: "row",
    gap: width * 0.02,
    paddingTop: "2%",
    paddingHorizontal: "1.8%",
  },
  input: {
    flex: 1,
    borderRadius: 30,
    paddingHorizontal: "2.5%",
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "white",
    padding: "2%",
    borderRadius: 50,
  },
  bubbleTail: {
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    borderTopWidth: 20, // Tail height
    borderLeftWidth: 18, // Tail width (left side)
    borderRightWidth: 0, // No right side border
    borderStyle: "solid",
    backgroundColor: "transparent",
  },
  defaultBubbleTail: {
    left: 0, // Align tail with the left side of the default message
    borderTopColor: "transparent", // Top color transparent (triangle will point left)
    borderLeftColor: "white", // Tail color matches default message background
  },
  userBubbleTail: {
    right: 0, // Align tail with the right side of the user message
    borderTopColor: "transparent", // Top color transparent (triangle will point right)
    borderLeftColor: "transparent", // No left color
    borderRightWidth: 18, // Tail width (right side)
    borderRightColor: "#74b9b0", // Tail color matches user message background
  },
});
