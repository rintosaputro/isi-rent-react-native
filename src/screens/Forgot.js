import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

const Forgot = () => {
  return (
    <View>
      <ImageBackground
        source={require('../img/bgForgot.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.opacity}>
          <View style={styles.header}>
            <View style={styles.back}>
              <Icon style={[styles.text, styles.icon]} name="left" size={25} />
              <Text style={[styles.text, styles.textBack]}> Back</Text>
            </View>
            <Text style={styles.head}>THAT'S OKAY,</Text>
            <Text style={styles.head}>WE GOT YOUR BACK</Text>
          </View>
          <View style={styles.form}>
            <Text style={[styles.text, styles.textForm]}>
              Enter your email to get reset password code
            </Text>
            <Input placeholder="Enter your email address" />
            <View style={[styles.btn, styles.sendCode]}>
              <Button color="primary">Send Code</Button>
            </View>
            <View style={[styles.btn, styles.resend]}>
              <Button color="secondary">Resend Code</Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    height: ScreenHeight,
  },
  opacity: {
    height: ScreenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  back: {
    marginTop: 30,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginEnd: 20,
  },
  textBack: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    marginTop: 0,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
  },
  form: {
    bottom: 0,
  },
  textForm: {
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    marginTop: 10,
  },
  ['text']: {
    color: '#fff',
  },
  sendCode: {
    marginTop: 20,
  },
  resend: {
    marginBottom: 90,
  },
});

export default Forgot;
