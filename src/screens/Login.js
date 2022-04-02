import {
  View,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';

import {authLogin} from '../redux/actions/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState();

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email && password) {
      dispatch(authLogin(email, password));
    } else {
      setIsError(true);
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/bgAuth.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.opacity}>
          <View style={styles.header}>
            <Text color={'white'} fontSize="4xl" bold style={styles.head}>
              LET'S EXPLORE
            </Text>
            <Text color={'white'} fontSize="4xl" bold style={styles.head}>
              THE WORLD
            </Text>
          </View>
          <View style={styles.form}>
            {isError && (
              <Text
                color={'danger.700'}
                style={styles.message}
                py="2"
                my="7"
                textAlign={'center'}
                fontSize="xl"
                bold>
                Wrong email or password!
              </Text>
            )}
            <Input
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.gap} />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              <Button color="primary" onPress={handleLogin}>
                Login
              </Button>
            </View>
            <View style={styles.signupContain}>
              <Text style={styles.signup}>Don't have account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.signup, styles.linkSignup]}>
                  {' '}
                  Sign up now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
  },
  head: {
    // color: '#fff',
    // fontWeight: 'bold',
    // fontSize: 35,
  },
  form: {
    bottom: 0,
  },
  message: {
    backgroundColor: 'rgba(15, 185, 177,0.7)',
    borderRadius: 10,
  },
  gap: {
    marginTop: 20,
  },
  btn: {
    marginBottom: 30,
  },
  forgot: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 118,
    marginVertical: 30,
  },
  signupContain: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
  },
  ['signup']: {
    color: '#fff',
  },
  linkSignup: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 83,
  },
});

export default Login;
