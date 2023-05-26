import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const Button = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#8a96f7' : '#6A79F5',
            },
            styles.button,
        ]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    text: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})