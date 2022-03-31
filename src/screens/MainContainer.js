import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import History from './History';
import Chat from './Chat';
import ProfileScreen from './Profile';
import UpdateProfile from './UpdateProfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Prof" component={ProfileScreen} />
      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfile} />
    </ProfileStack.Navigator>
  );
};

const MainContainer = () => {
  const homeRoute = 'Home';
  const historyRoute = 'History';
  const chatRoute = 'Chat';
  const profileRoute = 'Profile';

  const Tab = createBottomTabNavigator();

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={homeRoute}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          let routeName = route.name;
          if (routeName === homeRoute) {
            icon = 'home';
            color = focused ? '#32DBC6' : '#8395a7';
          } else if (routeName === historyRoute) {
            icon = 'sticky-note';
            color = focused ? '#32DBC6' : '#8395a7';
          } else if (routeName === chatRoute) {
            icon = 'comment';
            color = focused ? '#32DBC6' : '#8395a7';
          } else if (routeName === profileRoute) {
            icon = 'user';
            color = focused ? '#32DBC6' : '#8395a7';
          }
          return <FaIcon name={icon} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={homeRoute} component={Home} />
      <Tab.Screen name={historyRoute} component={History} />
      <Tab.Screen name={chatRoute} component={Chat} />
      <Tab.Screen name={profileRoute} component={ProfileStackScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainContainer;
