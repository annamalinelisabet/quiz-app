import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { VStack } from 'native-base'
import axios from 'axios'

const QuizScreen = () => {

    const [questions, setQuestions] = useState([])

    const getQuestions = useCallback(async () => {
        const res = await axios.get('https://the-trivia-api.com/v2/questions')
        setQuestions(res.data)
    }, [])
    
    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    return (
    <View style={styles.container}>
        { questions.length === 0 
            ? <ActivityIndicator />     
            : <VStack paddingY={20} paddingX={10}>
                <Text>Fråga 1/10</Text>
                <Text>{questions[0].question.text}</Text>
                <VStack>
                    <Text>{questions[0].correctAnswer}</Text>
                    <Text>{questions[0].incorrectAnswers[0]}</Text>
                    <Text>{questions[0].incorrectAnswers[1]}</Text>
                    <Text>{questions[0].incorrectAnswers[2]}</Text>
                </VStack>
            </VStack>
        }
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1faee',
        justifyContent: 'center',
        alignItems: 'center'
    },
})