import {combineReducers} from 'redux';
import home from '@pages/Home/store';
import loading from './loading';

export default combineReducers({
  ...home,
  loading,
});
