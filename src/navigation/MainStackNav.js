import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';

import UpdateProfile from '../screens/UpdateProfile';
import Filter from '../screens/Filter';
import Order from '../screens/Order';
import PaymentForm from '../screens/PaymentForm';
import SecondPayment from '../screens/SecondPayment';
import ThirdPayment from '../screens/ThirdPayment';
import FinishedPayment from '../screens/FinishedPayment';
import Favourites from '../screens/Favourites';

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
      <MainStack.Screen name="Order" component={Order} />
      <MainStack.Screen name="PaymentForm" component={PaymentForm} />
      <MainStack.Screen name="SecondPayment" component={SecondPayment} />
      <MainStack.Screen name="ThirdPayment" component={ThirdPayment} />
      <MainStack.Screen name="FinishedPayment" component={FinishedPayment} />
      <MainStack.Screen name="Favourites" component={Favourites} />
    </MainStack.Navigator>
  );
};

export default MainStackNav;
