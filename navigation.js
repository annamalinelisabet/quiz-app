import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './app/screens/WelcomeScreen'
import QuizScreen from './app/screens/QuizScreen'

const Navigation = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Quiz' component={QuizScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
