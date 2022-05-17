import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import reduxStore from './src/redux/store';

import MainStackNav from './src/navigation/MainStackNav';
import AuthStackNav from './src/navigation/AuthStackNav';

import PushNotification from 'react-native-push-notification';
import RNBootSplash from 'react-native-bootsplash';

PushNotification.createChannel({
  channelId: 'transaction',
  channelName: 'transaction notification',
  soundName: 'default',
  vibrate: true,
});

const Main = () => {
  const {auth} = useSelector(state => state);
  return (
    // <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
    <NavigationContainer>
      <NativeBaseProvider>
        {auth.token ? <MainStackNav /> : <AuthStackNav />}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const {store, persistor} = reduxStore();

const App = () => {
  // useEffect(() => {
  //   return async () => {
  //     await RNBootSplash.hide({fade: true});
  //   };
  // }, []);
  RNBootSplash.hide({fade: true});
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
