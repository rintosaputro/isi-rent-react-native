import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../components/Input';
import Button from '../components/Button';

import {authSignup} from '../redux/actions/signup';
import {checkEmail, checkPassword, checkPhone} from '../helper/check';

const Signup = ({navigation}) => {
  const [isErr, setIsErr] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState();

  const dispatch = useDispatch();

  const {signup} = useSelector(state => state);

  useEffect(() => {
    dispatch({
      type: 'SIGNUP_CLEAR',
    });
  }, [dispatch]);
  useEffect(() => {
    if (signup.isSuccess) {
      setUsername();
      setEmail();
      setPhone();
      setPassword();
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signup]);

  const handleSignup = () => {
    let err = false;
    setErrMessage();
    console.log(errMessage);
    if (username && email && phone && password) {
      setIsErr(false);
      if (!checkPassword(password)) {
        err = true;
        setIsErr(true);
        setErrMessage(
          'Password must be at least 6 characters must contain numeric lowercase and uppercase letter!',
        );
      }
      if (!checkPhone(phone)) {
        err = true;
        setIsErr(true);
        setErrMessage('Phone number does not match!');
      }
      if (!checkEmail(email)) {
        err = true;
        setIsErr(true);
        setErrMessage('Email is not valid!');
      }
      if (!err) {
        setIsErr(false);
        setErrMessage('');
        dispatch(authSignup(username, email, phone, password));
      }
    } else {
      setIsErr(true);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
    dispatch({type: 'AUTH_CLEAR_ERR'});
  };

  return (
    <ScrollView style={styles.scrolView}>
      <ImageBackground
        source={require('../assets/img/bgSignup.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.opacity}>
          <View style={styles.header}>
            <Text color={'white'} fontSize="4xl" bold style={styles.head}>
              LET'S HAVE
            </Text>
            <Text color={'white'} fontSize="4xl" bold style={styles.head}>
              SOME RIDE
            </Text>
          </View>
          <View style={styles.form}>
            {(isErr || signup.isError) && (
              <Text
                color={'white'}
                style={styles.message}
                py="2"
                my="7"
                textAlign={'center'}
                fontSize="xl"
                bold>
                {signup.isError
                  ? signup.errMessage
                  : errMessage || 'All data must be filled'}
              </Text>
            )}
            <Input
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
            <View style={styles.gap} />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.gap} />
            <Input
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              value={phone}
            />
            <View style={styles.gap} />
            <Input
              placeholder="Password"
              // keyboardType="visible-password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <View style={styles.btn}>
              {signup.isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : (
                <Button color="primary" onPress={handleSignup}>
                  Signup
                </Button>
              )}
            </View>
            <View style={styles.loginContain}>
              <Text style={styles.login}>Already have account?</Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text style={[styles.login, styles.linklogin]}> Login now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrolView: {
    height: '100%',
  },
  image: {
    height: '100%',
  },
  opacity: {
    height: '100%',
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
  message: {
    backgroundColor: '#ED4C67',
    borderRadius: 10,
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
    marginBottom: 150,
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
