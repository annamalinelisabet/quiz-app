import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'

const backgroundImg = { uri: 'https://images.pexels.com/photos/7034523/pexels-photo-7034523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }

const WelcomeScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} resizeMode='cover' style={styles.wrapper}>
                <Pressable style={[styles.textBox, { transform: [{ rotate: '-6deg' }] }]} onPress={() => navigation.navigate('Quiz')}>
                    <Text style={[styles.text, { fontSize: 60 }]}>QUIZZZZ</Text>
                </Pressable>
                <Button title='start' onPress={() => navigation.navigate('Quiz')} />
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox: {
        backgroundColor: '#bfc5fb',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
    },
    smallTextBox: {
        backgroundColor: '#6A79F5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 2
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})