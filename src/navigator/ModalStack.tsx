import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '@pages/Login';

export type ModalStackParmList = {
  Login: undefined;
};

const {Navigator, Screen} = createStackNavigator<ModalStackParmList>();

const ModalStack: React.FC = () => (
  <Navigator
    mode="modal"
    screenOptions={() => ({
      ...TransitionPresets.ModalSlideFromBottomIOS,
    })}>
    <Screen name="Login" component={Login} options={{headerShown: false}} />
  </Navigator>
);

export default ModalStack;
