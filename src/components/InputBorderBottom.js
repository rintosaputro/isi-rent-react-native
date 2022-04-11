import {TextInput, StyleSheet} from 'react-native';
import {Box} from 'native-base';
import React from 'react';

const InputBorderBottom = ({
  onChangeText,
  placeholder,
  price,
  border = false,
  keyboard,
  defaultValue,
}) => {
  const styles = StyleSheet.create({
    wrapper: {
      width: price ? '70%' : 'auto',
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: border ? 'black' : 'transparent',
      // width: '100%',
      paddingVertical: 5,
      fontSize: border ? 30 : 15,
      fontWeight: border ? 'bold' : 'normal',
      color: 'black',
    },
  });
  return (
    <Box background={'red'} style={styles.wrapper}>
      {price ? (
        <TextInput
          defaultValue={defaultValue}
          keyboardType={keyboard}
          placeholderTextColor={border ? 'black' : 'gray'}
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={styles.input}
        />
      ) : (
        <TextInput
          defaultValue={defaultValue}
          keyboardType={keyboard}
          placeholderTextColor={border ? 'black' : 'gray'}
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={styles.input}
        />
      )}
    </Box>
  );
};

export default InputBorderBottom;
