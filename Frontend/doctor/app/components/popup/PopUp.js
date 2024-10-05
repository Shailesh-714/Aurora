import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DataList from "../DataUpdate/DataList";
import ExeDetails from "../DataUpdate/ExeDetails";

const { height } = Dimensions.get("window");

const PopUp = ({ visible, onClose, title, data }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(height));
  const [detailsTab, setDetailsTab] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height, // Slide down out of view
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onClose());
      setDetailsTab(false);
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Background Fade View */}
        <Animated.View
          style={[styles.modalBackground, { opacity: fadeAnim }]}
        />
        {/* Sliding Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {detailsTab ? (
            <ExeDetails setDetailsTab={setDetailsTab} onClose={onClose} />
          ) : (
            <View style={styles.container}>
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                  <AntDesign name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
              {/* DataList Component to display exercise data */}
              <DataList data={data} setDetailsTab={setDetailsTab} />
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    minHeight:height,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.8,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default PopUp;
