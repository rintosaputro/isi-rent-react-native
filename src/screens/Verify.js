import {
  View,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Box, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {sendCodeVerify, verify} from '../redux/actions/verify';
import {checkEmail} from '../helper/check';

const Verify = ({navigation}) => {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isEmpty, setIsEmpty] = useState();
  const [errMessage, setErrMessage] = useState();
  const [isErr, setIsErr] = useState();

  const dispatch = useDispatch();

  const {verify: verifyState, profile} = useSelector(state => state);

  useEffect(() => {
    if (verifyState.isSuccess) {
      // navigation.navigate('Login');
      dispatch({type: 'VERIFY_CLEAR'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyState]);

  const handleSubmit = () => {
    if (code && password) {
      setIsEmpty(false);
      dispatch(verify(profile.results.username, code, password));
    } else {
      setIsEmpty(true);
    }
  };

  const handleSend = () => {
    if (checkEmail(email)) {
      setErrMessage();
      setIsErr(false);
      dispatch(sendCodeVerify(email));
    } else {
      setIsErr(true);
      setErrMessage('Email is not valid!');
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/bgForgot.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView style={styles.opacity}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} />
            <Text fontSize="4xl" style={styles.head}>
              Verification
            </Text>
            <Text fontSize="4xl" style={styles.head}>
              Code
            </Text>
          </View>
          <View style={styles.form}>
            <Text style={[styles.text, styles.textForm]} bold>
              {verifyState.isSend
                ? 'Code verification is send to your email'
                : ''}
            </Text>
            {(isEmpty || verifyState.isError) && (
              <Text
                color={'danger.700'}
                style={styles.message}
                py="2"
                my="7"
                textAlign={'center'}
                fontSize="xl"
                bold>
                {verifyState.isError
                  ? verifyState.errMessage
                  : 'All data must be filled'}
              </Text>
            )}
            {isErr && (
              <Text
                color={'danger.700'}
                style={styles.message}
                py="2"
                my="7"
                textAlign={'center'}
                fontSize="xl"
                bold>
                {errMessage}
              </Text>
            )}
            {verifyState.isSend ? (
              <>
                <Box my="5">
                  <Input
                    placeholder="Enter your code"
                    onChangeText={setCode}
                    value={code}
                    keyboardType="number-pad"
                  />
                </Box>
                {/* <Box my="5">
                  <Input
                    placeholder="Enter your username"
                    onChangeText={setUsername}
                    value={username}
                  />
                </Box> */}
                <Box my="5">
                  <Input
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    keyboardType="number-pad"
                  />
                </Box>
                <View style={[styles.btn, styles.sendCode]}>
                  <Button color="primary" onPress={handleSubmit}>
                    Verify
                  </Button>
                </View>
              </>
            ) : (
              <Box style={styles.sendCodeWrap}>
                {/* <Box my="5">
                  <Input
                    placeholder="Enter your Email"
                    onChangeText={setEmail}
                    value={code}
                    keyboardType="email-address"
                  />
                </Box>
                <Box>
                  <Button onPress={handleSend}>Send Code</Button>
                </Box> */}
                <ActivityIndicator size="large" color="#00ff00" />
              </Box>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
      {/* {verifyState.isSuccess && navigation.navigate('Login')} */}
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
    marginTop: '20%',
  },
  message: {
    backgroundColor: 'rgba(15, 185, 177,0.7)',
    borderRadius: 10,
  },
  textForm: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 19,
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
  sendCodeWrap: {
    flex: 1,
    // position: 'relative',
    marginTop: '30%',
  },
});

export default Verify;
