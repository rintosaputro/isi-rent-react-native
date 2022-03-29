import { View, Text, TextInput, StyleSheet, SafeAreaView, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import Input from '../components/Input'
import Container from '../components/Container'
import Button from '../components/Button'

const Login = () => {
  const image = { uri: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?cs=srgb&dl=pexels-matheus-bertelli-799443.jpg&fm=jpg'}
  return (
    <View>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <View style={styles.opacity}>
          {/* <Container> */}
            <View style={styles.header}>
              <Text style={styles.head}>LET'S EXPLORE</Text>
              <Text style={styles.head}>THE WORLD</Text>
            </View>
            <View style={styles.form}>
              <Input placeholder='Email'/>
              <View style={styles.gap} />
              <Input placeholder='Password'/>
              <Text style={styles.forgot}>Forgot Password?</Text>
              <View style={styles.btn}>
                <Button color='primary'>Login</Button>
              </View>
              <View style={styles.signupContain}>
                <Text style={styles.signup}>Don't have account?</Text>
                <Text style={[styles.signup, styles.linkSignup]}> Sign up now</Text>
              </View>
            </View>
          {/* </Container> */}
        </View>
      </ImageBackground>
    </View>
  )
}

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  image: {
    height: ScreenHeight,
  },
  opacity: {
    height: ScreenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    bottom: 0
  },
  gap: {
    marginTop: 20
  },
  btn: {
    marginBottom: 30
  },
  forgot: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 118,
    marginVertical: 30
  },
  signupContain: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50
  },
  ['signup']: {
    color: '#fff'
  },
  linkSignup: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 83
  }
})

export default Login
