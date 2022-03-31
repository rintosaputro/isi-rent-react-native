import {View} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Stack} from 'native-base';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Forgot from './src/screens/Forgot';
import Profile from './src/screens/Profile';
import Tabs from './src/navigation/Tabs';
import UpdateProfile from './src/screens/UpdateProfile';
import MainContainer from './src/screens/MainContainer';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainContainer />
        {/* <Profile /> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
