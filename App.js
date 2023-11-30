import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/rootStack';
import {Provider} from 'react-redux';
import { persistor, store } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen'



const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, [])
  return(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <RootStack />
</NavigationContainer>
</PersistGate>
</Provider>
  )
}

const styles = StyleSheet.create({})

export default App ;