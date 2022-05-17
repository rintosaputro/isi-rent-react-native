import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import React from 'react';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text fontSize={30}>Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default Chat;
