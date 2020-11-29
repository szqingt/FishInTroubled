import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import home from '@pages/Home/store';
import loading from './loading';
import user from './user';
import AsyncStorage from '@react-native-community/async-storage';

export default combineReducers({
  ...home,
  loading,
  user,
});
