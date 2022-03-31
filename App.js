import {View} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Stack} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Forgot from './src/screens/Forgot';
import Profile from './src/screens/Profile';
import Tabs from './src/navigation/Tabs';
import UpdateProfile from './src/screens/UpdateProfile';
// import MainContainer from './src/screens/MainContainer';
import BottomTabNav from './src/navigation/BottomTabNav';
import MainStackNav from './src/navigation/MainStackNav';
import AuthStackNav from './src/navigation/AuthStackNav';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthStackNav />
        {/* <MainStackNav /> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
