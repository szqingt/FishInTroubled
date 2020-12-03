import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Detail from '@pages/Detail';
import BottomTabs from './BottomTabs';
import {statusBarHeight} from '@utils/index';

export type MainStackParmList = {
  BottomTabs: undefined;
  Detail: {
    id: string;
  };
};

const {Navigator, Screen} = createStackNavigator<MainStackParmList>();

const MainStack: React.FC = () => (
  <Navigator
    mode="modal"
    screenOptions={{
      headerStatusBarHeight: statusBarHeight,
      headerTitleAlign: 'center',
      headerStyle: {
        height: 60,
      },
      ...TransitionPresets.ModalSlideFromBottomIOS,
    }}>
    <Screen name="BottomTabs" component={BottomTabs} />
    <Screen
      name="Detail"
      component={Detail}
      options={{headerShown: false, gestureEnabled: true}}
    />
  </Navigator>
);

export default MainStack;
