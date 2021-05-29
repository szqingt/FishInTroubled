import {StatusBar} from 'react-native';
import React from 'react';
import StackNavigator from './navigator';
import Loading from '@components/Loading';

export default () => {
  return (
    <>
      <StackNavigator />
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Loading />
    </>
  );
};
