import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import reduxStore from './src/redux/store';

import MainStackNav from './src/navigation/MainStackNav';
import AuthStackNav from './src/navigation/AuthStackNav';
import Favourites from './src/screens/Favourites';

const Main = () => {
  const {auth} = useSelector(state => state);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {auth.token ? <MainStackNav /> : <AuthStackNav />}
        {/* <Favourites /> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const {store, persistor} = reduxStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
