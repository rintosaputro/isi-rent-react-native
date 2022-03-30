import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';

const KeyboardAvoiding = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoiding;
