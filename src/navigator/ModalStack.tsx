import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {statusBarHeight} from '@utils/index';

export type ModalStackParmList = {
  Loading: undefined;
  Login: undefined;
};

const {Navigator, Screen} = createStackNavigator<ModalStackParmList>();

const ModalStack: React.FC = () => (
  <Navigator
    mode="modal"
    headerMode="screen"
    screenOptions={() => ({
      ...TransitionPresets.ModalSlideFromBottomIOS,
      cardOverlayEnabled: true,
      gestureEnabled: true,
      headerTitleAlign: 'center',
      headerStatusBarHeight: statusBarHeight,
      headerBackTitleVisible: false,
    })}>
    <Screen
      name="Login"
      component={() => <></>}
      options={{
        headerTitle: '登录',
      }}
    />
  </Navigator>
);

export default ModalStack;
