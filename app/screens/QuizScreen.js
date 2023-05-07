import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Spacer from '../components/Spacer'

const QuizScreen = () => {

    const navigation = useNavigation()

    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [points, setPoints] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [answerOptions, setAnswerOptions] = useState([])
    const [correct, setCorrect] = useState(null)
    const [nextQuestion, setNextQuestion] = useState(false)
    const currentQuestion = questions[index]

    const getQuestions = useCallback(async () => {
        const res = await axios.get('https://the-trivia-api.com/v2/questions')
        setQuestions(res.data)

        // ! LÄGG TILL ERROR HÄR
    }, [])
    
    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    const handleAnswer = ((rightAnswer) => {
        if(correct === null) {
            if(rightAnswer) {
                setPoints(points + 1)
                setCorrect(true)
            } else {
                setCorrect(false)
            }
            setNextQuestion(true)
        }
    })

    const handleNextQuestion = (() => {
        setNextQuestion(false)
        setIndex(index + 1)
        setCorrect(null)
    })
    
    useEffect(() => {
        console.log(currentQuestion)
      if(index > 9) {
        setShowModal(true)
      }
    }, [index, currentQuestion])

    useEffect(() => {
        if(currentQuestion) {
            const choices = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer]
            setAnswerOptions(choices.sort(() => Math.random() - 0.5))
        }
    }, [currentQuestion])
    
    return (
    <View style={styles.container}>
        { !currentQuestion
            ? <ActivityIndicator color='#1d3557' />     
            : <VStack flex={1}>
                <VStack flex={1}>
                    <Text>Question {index +1}/10</Text>
                    <Spacer size={80} />
                    <Text style={styles.question}>{currentQuestion.question.text}</Text>
                </VStack>
                <VStack>
                    {answerOptions.map((option, i) => (
                        <Pressable key={i} style={styles.answerBox} backgroundColor={correct === null ? '#1d3557' : correct && option === currentQuestion.correctAnswer ? 'green' : 'red'} onPress={() => handleAnswer(option === currentQuestion.correctAnswer)}>
                            <Text style={styles.answerText}>{option}</Text>
                        </Pressable>
                    ))}
                { nextQuestion && <Text onPress={handleNextQuestion}>Next question</Text> }
                </VStack>
            </VStack>
        }
        <Modal visible={showModal}>
            <View>
                <Text padding={20}>{points} / 10 correct answers!</Text>
                <Button color='#1d3557' onPress={() => navigation.navigate('Home')} title='Close' />
            </View>
        </Modal>
        
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1faee',
        paddingVertical: 70,
        paddingHorizontal: 25
    },
    question: {
        color: '#45789d',
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    answerBox: {
        padding: 20,
        marginBottom: 10,
        borderRadius: 10
    },
    answerText: {
        color: '#f1faee',
        fontSize: 20   
    }
})