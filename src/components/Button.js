import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({children, color, fontSize = 20, onPress = () => {}}) => {
  const styles = StyleSheet.create({
    primary: {
      backgroundColor: '#32DBC6',
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      color: 'black',
    },
    secondary: {
      backgroundColor: '#EBEFD0',
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'black',
      fontSize,
      fontWeight: 'bold',
      paddingHorizontal: 15,
    },
  });
  return (
    <TouchableOpacity
      style={color === 'primary' ? styles.primary : styles.secondary}
      onPress={onPress}>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
