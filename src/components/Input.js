import { TextInput, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({placeholder}) => {
  return (
    <SafeAreaView>
      <TextInput placeholder={placeholder} placeholderTextColor='#fff' style={styles.input} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 15,
  },
})

export default Input
