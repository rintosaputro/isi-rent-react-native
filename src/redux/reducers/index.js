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
import detailCategory from './detailCategory';
import filterVehicle from './filterVehicle';
import myOrder from './myOrder';
import detailVehicle from './detailVehicle';

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
  detailCategory,
  filterVehicle,
  myOrder,
  detailVehicle,
});

export default rootReducers;
