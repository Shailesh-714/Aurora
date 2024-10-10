import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Icon, { Icons } from "../components/tab_bar/Icons";
import Colors from "../components/tab_bar/Colors";
import ColorScreen from "../components/tab_bar/ColorScreen";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";
import ChatListScreen from "../screens/ChatListScreen";
import Dashboard from "../screens/Dashboard";
import ExploreScreen from "../screens/ExploreScreen";
import ActivityScreen from "../screens/ActivityScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileScreen from "../screens/ProfileScreen";
const { width, height } = Dimensions.get("window");
const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: Dashboard,
    color: "#5BB2D0",
  },
  {
    route: "Health",
    label: "Explore",
    type: Icons.MaterialCommunityIcons,
    icon: "food-apple-outline",
    component: ExploreScreen,
    color: "#FF7E67",
  },

  {
    route: "Community",
    label: "Chat",
    type: Icons.Ionicons,
    icon: "people-outline",
    component: ChatListScreen,
    color: "#7C4D96",
  },
  {
    route: "Activity",
    label: "Activity",
    type: Icons.Feather,
    icon: "activity",
    component: ActivityScreen,
    color: "#F14C6E",
  },

  {
    route: "Account",
    label: "Account",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
    component: ProfileScreen,
    color: "#FFAE0E",
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const isDarkMode = useColorScheme() === "dark";

  const { colors } = useTheme();
  const color = isDarkMode ? Colors.white : Colors.black;
  const bgColor = colors.background;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
      iconRef.current.transitionTo({ color: Colors.white });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
      iconRef.current.transitionTo({ color: item.color });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View
          style={[
            styles.btn,
            { borderColor: bgColor, backgroundColor: bgColor },
          ]}
        >
          <Animatable.View
            ref={circleRef}
            style={[
              styles.circle,
              { backgroundColor: focused ? item.color : item.color },
            ]}
          />
          <Animatable.View ref={iconRef}>
            <Icon
              type={item.type}
              name={item.icon}
              color={focused ? Colors.white : item.color}
            />
          </Animatable.View>
        </View>
        <Animatable.Text ref={textRef} style={[styles.text, { color }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <View style={{ flex: 1, minHeight: height }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    margin: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "500",
  },
});
