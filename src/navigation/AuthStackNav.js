import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';

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
    </AuthStack.Navigator>
  );
};

export default AuthStackNav;
