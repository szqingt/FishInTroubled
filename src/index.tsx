import {StatusBar} from 'react-native';
import React from 'react';
import StackNavigator from './navigator';
import {Provider} from 'react-redux';
import store from '@store/index';
import Loading from '@components/Loading';

export default () => (
  <Provider store={store}>
    <StackNavigator />
    <StatusBar
      backgroundColor="transparent"
      barStyle="dark-content"
      translucent
    />
    <Loading />
  </Provider>
);
