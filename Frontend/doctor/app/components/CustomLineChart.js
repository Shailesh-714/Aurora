import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { CaloryContext } from "../context/CaloryContext";

const CustomLineChart = ({
  setSelectedBurnedValue,
  setSelectedIntakeValue,
}) => {
  const { weeklyIntakeCal, weeklyBurnedCal } = useContext(CaloryContext);
  const [chartWidth, setChartWidth] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setChartWidth(width);
  };
  const findMaxValue = () => {
    const maxIntakeElement = weeklyIntakeCal.length
      ? weeklyIntakeCal.reduce((max, current) =>
          current.value > max.value ? current : max
        ).value
      : 0;

    const maxBurnedElement = weeklyBurnedCal.length
      ? weeklyBurnedCal.reduce((max, current) =>
          current.value > max.value ? current : max
        ).value
      : 0;
    const maxElement = Math.max(maxIntakeElement, maxBurnedElement) + 100;
    setMaxValue(maxElement);
  };

  useEffect(() => {
    findMaxValue();
  }, [weeklyIntakeCal, weeklyBurnedCal]);
  return (
    <View onLayout={handleLayout} style={{ justifyContent: "center" }}>
      <LineChart
        areaChart
        curved
        maxValue={maxValue}
        data={weeklyIntakeCal}
        data2={weeklyBurnedCal}
        height={chartWidth * 0.4}
        width={chartWidth}
        spacing={chartWidth / 8}
        initialSpacing={13}
        disableScroll
        color1="#87ceeb"
        color2="#ff7676"
        textColor1="green"
        hideDataPoints
        dataPointsColor1="#87ceeb"
        dataPointsColor2="#ff7676"
        startFillColor1="#87ceeb"
        startFillColor2="#ff7676"
        startOpacity1={0.9}
        startOpacity2={0.5}
        endOpacity1={0.3}
        endOpacity2={0.2}
        hideRules
        hideAxesAndRules
        xAxisLabelTextStyle={{
          fontSize: 10,
          fontWeight: "bold",
        }}
        pointerConfig={{
          pointerStripColor: "white",
          pointerStripWidth: 2,
          pointer2Color: "#ff7676",
          pointer1Color: "#87ceeb",
          radius: 5,
          persistPointer: true,
          pointerLabelWidth: 40,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items) => {
            setSelectedBurnedValue(items[1].value);
            setSelectedIntakeValue(items[0].value);
            return (
              <View
                style={{
                  backgroundColor: "white",
                  paddingVertical: 5,
                  borderRadius: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {items[0].label}
                </Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default CustomLineChart;
