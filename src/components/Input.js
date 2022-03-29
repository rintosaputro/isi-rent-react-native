import {TextInput, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

const Input = ({placeholder, ...set}) => {
  return (
    <SafeAreaView>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#fff"
        style={styles.input}
        {...set}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
