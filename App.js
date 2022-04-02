import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNav from './src/navigation/MainStackNav';
import AuthStackNav from './src/navigation/AuthStackNav';
import ThirdPayment from './src/screens/ThirdPayment';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <AuthStackNav /> */}
        <MainStackNav />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
