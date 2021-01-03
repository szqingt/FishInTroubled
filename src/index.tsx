import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigator from './navigator';
import Loading from '@components/Loading';
import {refreshUserInfo} from '@store/user';
import {useDispatch} from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    refreshUserInfo(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
