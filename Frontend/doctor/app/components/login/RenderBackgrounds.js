import { Animated, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width : width;

const RenderBackgrounds = ({ loginOptionList, scrollX }) => {
  return loginOptionList
    .filter((item) => item.bg)
    .map((item, index) => {
      const inputRange = [
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
      ];

      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-width, 0, width],
        extrapolate: "clamp",
      });

      return (
        <Animated.Image
          key={`bg-${index}`}
          source={item.bg}
          style={{
            position: "absolute",
            width: width,
            height: height,
            transform: [{ translateX }],
            zIndex: -3,
          }}
          resizeMode="cover"
        />
      );
    });
};

export default RenderBackgrounds;
