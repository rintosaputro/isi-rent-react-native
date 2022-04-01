import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';

import UpdateProfile from '../screens/UpdateProfile';
import Filter from '../screens/Filter';

const MainStack = createNativeStackNavigator();
const MainStackNav = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Bottom" component={BottomTabNav} />
      <MainStack.Screen name="UpdateProfile" component={UpdateProfile} />
      <MainStack.Screen name="Filter" component={Filter} />
    </MainStack.Navigator>
  );
};

export default MainStackNav;
