import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text } from 'react-native'
import { Progress, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Button from '../components/Button'
import Spacer from '../components/Spacer'

const image1 = { uri: 'https://images.pexels.com/photos/1071882/pexels-photo-1071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
const image2 = { uri: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' }

const QuizModal = ({ setStartQuiz, category, difficulty }) => {
    const navigation = useNavigation()

    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [progressValue, setProgressValue] = useState(0)
    const [points, setPoints] = useState(0)
    const [answerOptions, setAnswerOptions] = useState([])
    const [correct, setCorrect] = useState(null)
    const [nextQuestion, setNextQuestion] = useState(false)
    const currentQuestion = questions[index]
    const [selectedOption, setSelectedOption] = useState(null)

    const getQuestions = useCallback(async () => {
        const res = await axios.get(`https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}`)
        setQuestions(res.data)

        // ! LÄGG TILL ERROR HÄR
    }, [])

    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    const handleAnswer = ((option) => {
        if (correct === null) {
            if (option === currentQuestion.correctAnswer) {
                setPoints(points + 1)
                setCorrect(true)
            } else {
                setCorrect(false)
            }
            setNextQuestion(true)
            setProgressValue(progressValue + 10)
            setSelectedOption(option)
        }
    })

    const handleNextQuestion = (() => {
        setNextQuestion(false)
        setIndex(index + 1)
        setCorrect(null)
    })

    const finishQuiz = (() => {
        navigation.navigate('Quiz')
        setStartQuiz(false)
    })

    useEffect(() => {
        if (currentQuestion) {
            const choices = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer]
            setAnswerOptions(choices.sort(() => Math.random() - 0.5))
        }
    }, [currentQuestion])

    return (
        <Modal animationType='fade' transparent>
            {
                index < 10
                    ? <VStack style={styles.modal}>
                        {!currentQuestion
                            ? <>
                                <Spacer size={40} />
                                <ActivityIndicator color='#6A79F5' size='large' />
                            </>
                            : <VStack flex={1}>
                                <VStack flex={1}>
                                    <Text style={styles.close} onPress={() => setStartQuiz(false)}>CLOSE X</Text>
                                    <Text style={styles.category}>{category}</Text>
                                    <Spacer size={10} />
                                    <Progress colorScheme='light' value={progressValue} />
                                    <Spacer size={5} />
                                    <Text>{index + 1}/10</Text>
                                    <Spacer size={50} />
                                    <Text style={styles.question}>{currentQuestion.question.text}</Text>
                                </VStack>
                                <VStack>
                                    {answerOptions.map((option, i) => (
                                        <Pressable
                                            key={i}
                                            style={[
                                                styles.answerBox,
                                                {
                                                    backgroundColor:
                                                        selectedOption === option
                                                            ? selectedOption === currentQuestion.correctAnswer
                                                                ? '#6AF5A1'
                                                                : '#F56A78'
                                                            : '#bfc5fb'
                                                },
                                                correct === false && option === currentQuestion.correctAnswer && { backgroundColor: '#6AF5A1' }
                                            ]}
                                            onPress={() => handleAnswer(option)}
                                        >
                                            <Text style={styles.answerText}>{option}</Text>
                                        </Pressable>
                                    ))}
                                    <VStack height={42}>
                                        {nextQuestion &&
                                            <Pressable onPress={handleNextQuestion} height={42} justifyContent='center'>
                                                <Text style={styles.nextQuestion}>{index === 9 ? 'SEE RESULT' : 'Next question >>'}</Text>
                                            </Pressable>
                                        }
                                    </VStack>
                                </VStack>
                            </VStack>
                        }
                    </VStack>
                    : <VStack style={styles.modal}>
                        <VStack flex={1} justifyContent='center'>
                            <Text style={styles.points}>{points} / 10</Text>
                            <Text style={styles.points}>CORRECT ANSWERS</Text>
                            {points <= 2 && <Text style={styles.text}>Oops! Looks like your brain took a little vacation during the quiz. But hey, the good news is that you now have the perfect excuse for a rematch!</Text>}
                            {(points === 3 || points === 4) && <Text style={styles.text}>Well, well, well... Your score might not break any records, but hey, at least you had a good time, right?</Text>}
                            {points === 5 && <Text style={styles.text}>You've hit the sweet spot of mediocrity. Halfway there, halfway to go. Time to kick it up a notch and aim for the stars!</Text>}
                            {(points === 6 || points === 7) && <Text style={styles.text}>You rocked that quiz like a superstar! Your brain is on fire, my friend. Keep up the amazing work!</Text>}
                            {(points === 8 || points === 9) && <Text style={styles.text}>Well, look at you, quiz genius! You're like a walking encyclopedia of knowledge. Your brain must be powered by rocket fuel!</Text>}
                            {points === 10 && <Text style={styles.text}>Boom! Flawless victory! You aced it, my friend! Your brain is a trivia powerhouse, leaving no question uncracked. Keep shining like the quiz superstar you are!</Text>}
                        </VStack>
                        <Image source={points > 4 ? image1 : image2} flex={3} marginBottom={10} />
                        <Button color='#6A79F5' onPress={finishQuiz} title='Done' />
                    </VStack>
            }
        </Modal>
    )
}

export default QuizModal

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginVertical: 40,
        borderRadius: 10,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    question: {
        color: '#F56ABE',
        fontSize: 18,
        fontWeight: 'bold',
    },
    answerBox: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10
    },
    answerText: {
        color: 'white',
        fontSize: 14
    },
    close: {
        color: '#babdc0',
        textAlign: 'right',
        fontSize: 12
    },
    category: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#6A79F5',
        fontWeight: 'bold'
    },
    nextQuestion: {
        textAlign: 'center',
        color: '#6A79F5',
        fontWeight: 'bold',
        padding: 10
    },
    points: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F56ABE'
    },
    text: {
        color: '#bfc5fb',
        textAlign: 'center'
    }
})