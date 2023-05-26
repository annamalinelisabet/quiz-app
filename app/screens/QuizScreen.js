import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native'
import { HStack, VStack } from 'native-base'
import Button from '../components/Button'
import Spacer from '../components/Spacer'
import QuizModal from '../components/QuizModal'
import DifficultyModal from '../components/DifficultyModal'

const backgroundImg = { uri: 'https://images.pexels.com/photos/1982485/pexels-photo-1982485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }

const QuizScreen = () => {

    categoryColor = '#6A79F5'

    const [startQuiz, setStartQuiz] = useState(false)
    const [category, setCategory] = useState('')
    const [chooseDifficulty, setChooseDifficulty] = useState(false)
    const [difficulty, setDifficulty] = useState('')

    const handleCategory = (category) => {
        setCategory(category)
        setChooseDifficulty(true)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} resizeMode='cover' style={styles.wrapper}>
                {
                    !chooseDifficulty && <>
                        <Pressable style={[styles.textBox, { transform: [{ rotate: '1deg' }] }]} onPress={() => navigation.navigate('Quiz')}>
                            <Text style={styles.text}>pick a category</Text>
                        </Pressable>
                        <Spacer size={20} />
                        <VStack space={5}>
                            <HStack justifyContent='center' space={5}>
                                <Button flex={1} title='music' onPress={() => handleCategory('music')} />
                                <Button flex={1} title='sport & leisure' onPress={() => handleCategory('sport_and_leisure')} />
                            </HStack>
                            <HStack justifyContent='center' space={5}>
                                <Button title='arts & literature' onPress={() => handleCategory('arts_and_literature')} />
                                <Button title='film & tv' onPress={() => handleCategory('film_and_tv')} />
                            </HStack>
                            <HStack justifyContent='center' space={5}>
                                <Button title='history' onPress={() => handleCategory('history')} />
                                <Button title='society & culture' onPress={() => handleCategory('society_and_culture')} />
                            </HStack>
                            <HStack justifyContent='center' space={5}>
                                <Button title='geography' onPress={() => handleCategory('geography')} />
                                <Button title='science' onPress={() => handleCategory('science')} />
                            </HStack>
                        </VStack>
                    </>
                }
                {startQuiz && <QuizModal setStartQuiz={setStartQuiz} category={category} difficulty={difficulty} />}
                {chooseDifficulty && <DifficultyModal setStartQuiz={setStartQuiz} category={category} setDifficulty={setDifficulty} setChooseDifficulty={setChooseDifficulty} />}
            </ImageBackground>
        </View>
    )
}

export default QuizScreen

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
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        textTransform: 'uppercase'
    }
})