import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';

const Input = ({placeholder, ...set}) => {
  return (
    <View style={styles.parrent}>
      <View style={styles.flexInput} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#fff"
        style={styles.input}
        {...set}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parrent: {
    // flex: 1,
  },
  flexInput: {
    flex: 1,
  },
  input: {
    height: 60,
    color: '#fff',
    backgroundColor: 'rgba(178, 190, 195,0.5)',
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 15,
  },
});

export default Input;
