import {combineReducers} from 'redux';
import home from '@pages/Home/store';
import loading from './loading';
import user from './user';

export default combineReducers({
  ...home,
  loading,
  user,
});
