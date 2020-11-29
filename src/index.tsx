import {StatusBar} from 'react-native';
import React, { useEffect } from 'react';
import StackNavigator from './navigator';
import {Provider as ReduxProvider} from 'react-redux';
import store from '@store/index';
import Loading from '@components/Loading';
import {Provider as AntDProvider} from '@ant-design/react-native';

export default () => {

  useEffect(() => {
    // todo
  }, []);

  return (
    <AntDProvider>
      <ReduxProvider store={store}>
        <StackNavigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <Loading />
      </ReduxProvider>
    </AntDProvider>
  )
};
