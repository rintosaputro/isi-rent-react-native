import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import History from '../screens/History';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

import StackNav from './StackNav';

const BottomTabNav = () => {
  const stackRoute = 'StackNavigator';
  const historyRoute = 'History';
  const chatRoute = 'Chat';
  const profileRoute = 'Profile';

  const Tab = createBottomTabNavigator();

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={stackRoute}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          let routeName = route.name;
          if (routeName === stackRoute) {
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
      <Tab.Screen name={stackRoute} component={StackNav} />
      <Tab.Screen name={historyRoute} component={History} />
      <Tab.Screen name={chatRoute} component={Chat} />
      <Tab.Screen name={profileRoute} component={Profile} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default BottomTabNav;
