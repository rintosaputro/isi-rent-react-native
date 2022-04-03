import {
  View,
  Text,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

const Verify = ({navigation}) => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/img/bgForgot.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView style={styles.opacity}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back}>
              <Icon style={[styles.text, styles.icon]} name="left" size={25} />
              <Text style={[styles.text, styles.textBack]}> Back</Text>
            </TouchableOpacity>
            <Text style={styles.head}>Verification</Text>
            <Text style={styles.head}>Code</Text>
          </View>
          <View style={styles.form}>
            <Text style={[styles.text, styles.textForm]}>Enter your code</Text>
            <Input placeholder="Enter your code" keyboardType="number-pad" />
            <View style={[styles.btn, styles.sendCode]}>
              <Button color="primary">Verify</Button>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

// let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    height: '100%',
  },
  opacity: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    flexDirection: 'column',
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
    marginTop: '70%',
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
    marginBottom: 90,
  },
});

export default Verify;
