import {
  View,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPwd, verifyPwd} from '../redux/actions/forgot';
import {checkEmail, checkPassword} from '../helper/check';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isEmpty, setIsEmpty] = useState();
  const [checkPwd, setCheckPwd] = useState(true);
  const [errMessage, setErrMessage] = useState();

  const {forgot} = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FORGOT_CLEAR_ALL',
    });
  }, [dispatch]);

  useEffect(() => {
    if (forgot.isSuccess) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgot]);

  const handleSend = () => {
    setErrMessage('');
    if (email) {
      if (checkEmail(email)) {
        setIsEmpty(false);
        dispatch(forgotPwd(email));
      } else {
        setErrMessage('Wrong email input!');
      }
    } else {
      setIsEmpty(true);
    }
  };

  const confrimPwd = () => {
    setErrMessage('');
    if (code && password && confirmPassword) {
      setIsEmpty(false);
      if (!checkPassword(password)) {
        setErrMessage(
          'Password must be at least 6 characters must contain numeric lowercase and uppercase letter!',
        );
      }
      if (password === confirmPassword) {
        setCheckPwd(true);
        dispatch(verifyPwd(email, code, password, confirmPassword));
      } else {
        setCheckPwd(false);
      }
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/bgForgot.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.opacity}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}>
              <Icon style={[styles.text, styles.icon]} name="left" size={25} />
              <Text style={[styles.text, styles.textBack]}> Back</Text>
            </TouchableOpacity>
            <Text fontSize="4xl" style={styles.head}>
              THAT'S OKAY,
            </Text>
            <Text fontSize="4xl" style={styles.head}>
              WE GOT YOUR BACK
            </Text>
          </View>
          {!forgot.isCodeSend ? (
            <View style={styles.form}>
              <Text style={[styles.text, styles.textForm]}>
                Enter your email to get reset password code
              </Text>
              {(isEmpty || forgot.isError) && (
                <Text
                  color={'white'}
                  style={styles.message}
                  py="2"
                  my="7"
                  textAlign={'center'}
                  fontSize="xl"
                  bold>
                  {errMessage
                    ? errMessage
                    : forgot.isError
                    ? forgot.errMessage
                    : 'Data must be filled'}
                </Text>
              )}
              <ScrollView>
                <Box py="5">
                  <Input
                    keyboardType="email-address"
                    placeholder="Enter your email address"
                    onChangeText={setEmail}
                    value={email}
                  />
                </Box>
              </ScrollView>
              <View style={[styles.btn, styles.sendCode]}>
                <Button color="primary" onPress={handleSend}>
                  Send Code
                </Button>
              </View>
              <View style={[styles.btn, styles.resend]}>
                <Button color="secondary" onPress={handleSend}>
                  Resend Code
                </Button>
              </View>
            </View>
          ) : (
            <>
              <ScrollView style={styles.secondForm}>
                {(isEmpty || forgot.isError || !checkPwd) && (
                  <Text
                    color={'white'}
                    style={styles.message}
                    py="2"
                    my="7"
                    textAlign={'center'}
                    fontSize="xl"
                    bold>
                    {(!checkPwd &&
                      'The password confirmation does not match') ||
                      (forgot.isError
                        ? forgot.errMessage
                        : 'Data must be filled')}
                  </Text>
                )}
                <Box py="5">
                  <Input
                    onChangeText={setCode}
                    value={code}
                    keyboardType="numeric"
                    placeholder="Enter your Code"
                  />
                </Box>
                <Box py="5">
                  <Input
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Enter your New Password"
                  />
                </Box>
                <Box py="5">
                  <Input
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={true}
                    placeholder="Enter your Confirm Password"
                  />
                </Box>
                <View style={[styles.btn, styles.sendCode]}>
                  <Button color="primary" onPress={confrimPwd}>
                    Change Password
                  </Button>
                </View>
                <View style={[styles.btn, styles.resend]}>
                  <Button color="secondary" onPress={handleSend}>
                    Resend Code
                  </Button>
                </View>
              </ScrollView>
            </>
          )}
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
  message: {
    // backgroundColor: 'rgba(15, 185, 177,0.9)',
    borderRadius: 10,
    backgroundColor: '#ED4C67',
  },
  secondForm: {
    marginTop: 120,
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
