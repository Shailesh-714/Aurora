import { Image, useWindowDimensions, SafeAreaView } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

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
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
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
    backgroundColor: "#fff",
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
