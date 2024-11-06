import React, { createContext, useContext, useState, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import ToastBar from "../components/popup/ToastBar";

const ToastBarContext = createContext();

// Hook to use the Toast Bar context
export const useToastBar = () => useContext(ToastBarContext);

// Provider component to wrap the app
export const ToastBarProvider = ({ children }) => {
  const [header, setHeader] = useState(null);
  const [message, setMessage] = useState(null);
  const [duration, setDuration] = useState(3000);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("#00ff00");

  const showToastBar = (title, msg, duration = 3000, colr = "#00ff00") => {
    setHeader(title);
    setMessage(msg);
    setDuration(duration);
    setVisible(true);
    setColor(colr);
  };

  const hideToastBar = () => setVisible(false);

  return (
    <ToastBarContext.Provider value={{ showToastBar, hideToastBar }}>
      {children}
      {visible && (
        <ToastBar
          header={header}
          message={message}
          duration={duration}
          onDismiss={hideToastBar}
          color={color}
        />
      )}
    </ToastBarContext.Provider>
  );
};
