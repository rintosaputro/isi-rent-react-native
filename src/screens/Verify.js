import {
  View,
  StyleSheet,
  // Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Box, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {verify} from '../redux/actions/verify';

const Verify = ({navigation}) => {
  const [code, setCode] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isEmpty, setIsEmpty] = useState();

  const dispatch = useDispatch();

  const {verify: verifyState} = useSelector(state => state);

  useEffect(() => {
    if (verifyState.isSuccess) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyState]);

  const handleSubmit = () => {
    if (code && username && password) {
      setIsEmpty(false);
      dispatch(verify(username, code, password));
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
        <ScrollView style={styles.opacity}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back}>
              <Icon style={[styles.text, styles.icon]} name="left" size={25} />
              <Text style={[styles.text, styles.textBack]}> Back</Text>
            </TouchableOpacity>
            <Text fontSize="4xl" style={styles.head}>
              Verification
            </Text>
            <Text fontSize="4xl" style={styles.head}>
              Code
            </Text>
          </View>
          <View style={styles.form}>
            <Text style={[styles.text, styles.textForm]}>Enter your code</Text>
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
            <Box my="5">
              <Input
                placeholder="Enter your code"
                onChangeText={setCode}
                value={code}
                keyboardType="number-pad"
              />
            </Box>
            <Box my="5">
              <Input
                placeholder="Enter your username"
                onChangeText={setUsername}
                value={username}
              />
            </Box>
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
