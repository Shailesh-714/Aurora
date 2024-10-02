import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Progress from "react-native-progress";


const ProgressBar = ({color, progress}) => {
    
    const [barWidth, setBarWidth] = useState(0);
  return (
    <View style={{backgroundColor:"#f2f2f2", borderRadius:50, width:"100%"}}onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setBarWidth(width); 
      }}>

              <Progress.Bar
                progress={progress}
                width={barWidth}
                borderWidth={0}
                color={color}
                animated={true}
                animationConfig={{ bounciness: 1 }}
                
              /></View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({})