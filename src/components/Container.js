import { View, StyleSheet } from 'react-native'
import React from 'react'

const Container = ({chlidren}) => {
  return (
    <View style={styles.container}>
      {chlidren}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: 900
  }
})

export default Container
