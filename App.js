import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNav from './src/navigation/MainStackNav';
import AuthStackNav from './src/navigation/AuthStackNav';
import PaymentForm from './src/screens/PaymentForm';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <AuthStackNav /> */}
        <PaymentForm />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
