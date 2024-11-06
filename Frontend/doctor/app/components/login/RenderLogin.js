import * as React from "react";
import {
  View,
  Dimensions,
  Animated,
  Platform,
  ImageBackground,
} from "react-native";
import { useAnimatedRef } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width : width;
const ICON_SIZE = width * 0.35;
const EMPTY_ICON_SIZE = (width - ICON_SIZE) / 2;

const RenderLogin = ({ loginOptionList, scrollX }) => {
  const flatListRef = useAnimatedRef();

  React.useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: value * 0.35,
          animated: false,
        });
      }
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [scrollX]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        maxHeight: width * (700 / 1080),
        minHeight: width * (700 / 1080),
      }}
    >
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={loginOptionList}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.9}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          alignItems: "center",
        }}
        snapToInterval={ICON_SIZE}
        snapToAlignment="start"
        // Remove the onScroll prop as we are controlling scroll programmatically
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.icon) {
            return <View style={{ width: EMPTY_ICON_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [80, 0, 80],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          const opacityBg = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: ICON_SIZE,
                padding: 10,
                justifyContent: "space-around",
              }}
            >
              <View>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    transform: [{ scale }, { translateY }],
                    opacity,
                  }}
                >
                  <ImageBackground
                    source={item.icon}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Animated.View style={{ opacity: opacityBg }}>
                      <LottieView
                        source={require("../../assets/Lottie/iconHighlight.json")}
                        autoPlay
                        loop
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      />
                    </Animated.View>
                  </ImageBackground>
                </Animated.View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default RenderLogin;
