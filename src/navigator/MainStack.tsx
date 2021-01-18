import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Detail from '@pages/Detail';
import BottomTabs from './BottomTabs';
import {statusBarHeight} from '@utils/index';
import Listen from '@pages/Listen/Listen';
import {Platform, StyleSheet} from 'react-native';

export type MainStackParmList = {
  BottomTabs: undefined;
  Detail: {
    id: string;
  };
  Listen: {
    id?: string;
  };
};

const {Navigator, Screen} = createStackNavigator<MainStackParmList>();

const MainStack: React.FC = () => {
  return (
    <Navigator
      mode="modal"
      screenOptions={{
        headerStatusBarHeight: statusBarHeight,
        headerTitleAlign: 'center',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Screen name="BottomTabs" component={BottomTabs} />
      <Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '专辑详情',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Screen
        name="Listen"
        initialParams={{id: undefined}}
        component={Listen}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: {vertical: 400},
        }}
      />
    </Navigator>
  );
};

export default MainStack;
