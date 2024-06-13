import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectSemiCircle from '../components/SemiCircle'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <SelectSemiCircle/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})