import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';
import Verify from '../screens/Verify';

const AuthStack = createNativeStackNavigator();

const AuthStackNav = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Forgot" component={Forgot} />
      <AuthStack.Screen name="Verify" component={Verify} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNav;
