import React from 'react'
import { AppRegistry } from 'react-native'
import WelcomeScreen from './app/screens/WelcomeScreen'
import { NativeBaseProvider } from 'native-base'
import Navigation from './navigation'

AppRegistry.registerComponent('WelcomeScreen', () => WelcomeScreen)

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
    </NativeBaseProvider>
  )
}
