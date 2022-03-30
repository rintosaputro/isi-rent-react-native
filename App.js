import {View} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Forgot from './src/screens/Forgot';
import Home from './src/screens/Home';
import Tabs from './src/navigation/Tabs';
import MainContainer from './src/screens/MainContainer';

const App = () => {
  return (
    // <NavigationContainer>
    <NativeBaseProvider>
      <MainContainer />
    </NativeBaseProvider>
    // </NavigationContainer>
  );
};

export default App;
