import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Spacer from '../components/Spacer'

const WelcomeScreen = () => {

    const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <VStack>
            <Text style={styles.text}>QUIZZZZ</Text>
            <Spacer size={30} />
            <Button color='#1d3557' onPress={() => navigation.navigate('Quiz')} title='Start' />
        </VStack>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f1faee',
        justifyContent: 'center'
    },
    text: {
        color: '#45789d',
        fontSize: 54,
        fontWeight: 'bold'
    }
})