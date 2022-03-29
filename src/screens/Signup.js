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
import {useState} from 'react/cjs/react.development';

const Signup = () => {
  const [text, setText] = useState({text: ''});
  const handleChange = key => {
    if (/^\d+$/.test(key)) {
      setText({text: key});
    }
  };
  return (
    <View>
      <ImageBackground
        source={require('../img/bgSignup.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.opacity}>
          <View style={styles.header}>
            <Text style={styles.head}>LET'S HAVE</Text>
            <Text style={styles.head}>SOME RIDE</Text>
          </View>
          <View style={styles.form}>
            <Input placeholder="Email" />
            <View style={styles.gap} />
            <Input
              placeholder="Phone Number"
              keyboardType="numeric"
              onChangeText={handleChange}
              value={text}
            />
            <View style={styles.gap} />
            <Input placeholder="Password" secureTextEntry={true} />
            <View style={styles.btn}>
              <Button color="primary">Signup</Button>
            </View>
            <View style={styles.loginContain}>
              <Text style={styles.login}>Already have account?</Text>
              <Text style={[styles.login, styles.linklogin]}> Login now</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    marginVertical: 60,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
  },
  form: {
    bottom: 0,
  },
  gap: {
    marginTop: 20,
  },
  btn: {
    marginVertical: 30,
  },
  forgot: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 118,
    marginVertical: 30,
  },
  loginContain: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
  },
  ['login']: {
    color: '#fff',
  },
  linklogin: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 74,
    fontWeight: 'bold',
  },
});

export default Signup;
