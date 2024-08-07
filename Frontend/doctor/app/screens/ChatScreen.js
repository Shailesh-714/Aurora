import { Image, useWindowDimensions, View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform, } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const screenWidth = useWindowDimensions("window").width;
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "In this interactive chat we'll review your cycle length together. This could help you understand if something needs your attention and what information to show to your doctor. The next part is available only for Flo Premium subscribers.",
    },
    {
      id: "2",
      text: "You can try it now for free. Flo is offering you a free trial. It gives you access to all of our Premium content, including articles, courses, and chats.",
    },
    { id: "3", text: "What happens after the trial period?" },
    {
      id: "4",
      text: "You can cancel the subscription at any time. If you do, the app will return to standard mode when the trial ends.",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: inputText },
      ]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }) => {
    const isUserMessage = parseInt(item.id) > 4; // Assuming IDs for default messages are 1-4
    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessage : styles.defaultMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUserMessage ? styles.userMessageText : styles.defaultMessageText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          minWidth: screenWidth,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 0.3,
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
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Feather name="send" size={24} color="#8129a0" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f5f6",
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "90%",
  },
  defaultMessage: {
    backgroundColor: "#ead5f9",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#ca71e9",
    alignSelf: "flex-end",
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
  inputContainer: {
    flexDirection: "row",
    gap: 15,
    paddingTop: 8,
    paddingHorizontal: 7,
  },
  input: {
    flex: 1,

    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
  },
});
