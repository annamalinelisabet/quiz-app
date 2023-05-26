import React from 'react'
import { Modal, StyleSheet, Text } from 'react-native'
import { VStack } from 'native-base'
import Spacer from './Spacer'
import Button from './Button'

const DifficultyModal = ({ setStartQuiz, setDifficulty, setChooseDifficulty }) => {

    const handleChoice = (difficulty) => {
        setDifficulty(difficulty)
        setChooseDifficulty(false)
        setStartQuiz(true)
    }

    return (
        <Modal animationType='fade' transparent>
            <VStack style={styles.modal}>
                <Text style={styles.close} onPress={() => setChooseDifficulty(false)}>CLOSE X</Text>
                <VStack paddingHorizontal={20}>
                    <Text style={[styles.header, { transform: [{ rotate: '0deg' }] }]}>READY TO RUMBLE?</Text>
                    <Text style={styles.text}>First, choose your skill level</Text>
                    <Spacer size={20} />
                    <VStack space={4}>
                        <Button title='easy peasy' onPress={() => handleChoice('easy')} />
                        <Button title='medium squeezy' onPress={() => handleChoice('medium')} />
                        <Button title='hard as nails' onPress={() => handleChoice('hard')} />
                    </VStack>
                </VStack>
                <Text style={styles.text}></Text>
            </VStack>
        </Modal>
    )
}

export default DifficultyModal

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginVertical: 200,
        justifyContent: 'space-between',
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
    header: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F56ABE',
    },
    close: {
        color: '#babdc0',
        textAlign: 'right',
        fontSize: 12,
    },
    text: {
        textAlign: 'center',
        color: '#bfc5fb'
    }
})