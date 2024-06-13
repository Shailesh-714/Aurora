import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import StackNavigator from './app/navigation/StackNavigator';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync().then(() =>
          setAppIsReady(true)
        );
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }
  return (
    <View
          onLayout={onLayoutRootView}
          style={{
            flex: 1,
          }}
        >
          <StackNavigator />
        </View>
  );
}

const styles = StyleSheet.create({
});
