import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from './auth';
import signup from './signup';
import verify from './verify';
import forgot from './forgot';
import cars from './cars';
import bike from './bike';
import motorbike from './motorbike';
import pickup from './pickup';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: persistReducer(persistConfig, auth),
  signup,
  verify,
  forgot,
  cars,
  bike,
  motorbike,
  pickup,
});

export default rootReducers;
