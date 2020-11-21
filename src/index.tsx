import {StatusBar} from 'react-native';
import React from 'react';
import StackNavigator from './navigator';
import {Provider} from 'react-redux';
import configureStore from '@store/index';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <StackNavigator />
    <StatusBar
      backgroundColor="transparent"
      barStyle="dark-content"
      translucent
    />
  </Provider>
);
