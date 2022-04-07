import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import DetailCategory from '../screens/DetailCategory';
import SearchList from '../screens/SearchList';
import AddItem from '../screens/AddItem';

const StackNavigator = createNativeStackNavigator();

const StackNav = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigator.Screen name="Home" component={Home} />
      <StackNavigator.Screen
        options={{headerShown: true}}
        name="DetailCategory"
        component={DetailCategory}
      />
      <StackNavigator.Screen name="SearchList" component={SearchList} />
      <StackNavigator.Screen name="AddItem" component={AddItem} />
    </StackNavigator.Navigator>
  );
};

export default StackNav;
