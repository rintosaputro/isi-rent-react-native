import {
  View,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Box, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';

import {authLogin} from '../redux/actions/auth';

const Login = ({navigation}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState();

  const dispatch = useDispatch();
  const {auth, verify, signup} = useSelector(state => state);
  useEffect(() => {
    dispatch({
      type: 'AUTH_CLEAR_ERR',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   if (verify.gotoVerify === 'verify') {
  //     navigation.navigate('Verify');
  //   }
  // }, [navigation, verify.gotoVerify]);

  const handleLogin = () => {
    if (username && password) {
      setIsError(false);
      dispatch(authLogin(username, password));
      dispatch({
        type: 'AUTH_CLEAR_ERR',
      });
      dispatch({type: 'SIGNUP_CLEAR'});
    } else {
      setIsError(true);
    }
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
    setIsError(false);
    dispatch({
      type: 'AUTH_CLEAR_ERR',
    });
    dispatch({
      type: 'SIGNUP_CLEAR',
    });
  };
  const goToForgot = () => {
    navigation.navigate('Forgot');
    setIsError(false);
    dispatch({
      type: 'AUTH_CLEAR_ERR',
    });
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
            {(isError || auth.isError) && (
              <Text
                color={'white'}
                style={styles.message}
                py="2"
                my="7"
                textAlign={'center'}
                fontSize="xl"
                bold>
                {auth.isError ? auth.errMessage : 'Empty username or password!'}
              </Text>
            )}
            {signup.isSuccess && (
              <Box my="7" py="5" style={styles.messageSignup}>
                <Text
                  // color={'white'}
                  // style={styles.messageSignup}
                  // py="2"
                  // mt="7"
                  textAlign={'center'}
                  fontSize="xl"
                  bold>
                  Registration success!
                </Text>
                <Text
                  // style={styles.messageSignup}
                  // pb="2"
                  // mb="7"
                  textAlign={'center'}
                  fontSize="xl"
                  bold>
                  Login to your account
                </Text>
              </Box>
            )}
            <Input
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
            <View style={styles.gap} />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={goToForgot}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              {auth.isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : (
                <Button color="primary" onPress={handleLogin}>
                  Login
                </Button>
              )}
            </View>
            <View style={styles.signupContain}>
              <Text style={styles.signup}>Don't have account?</Text>
              <TouchableOpacity onPress={goToSignup}>
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
    // backgroundColor: 'rgba(15, 185, 177,0.8)',
    backgroundColor: '#ED4C67',
    borderRadius: 10,
  },
  messageSignup: {
    backgroundColor: '#EBEFD0',
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
