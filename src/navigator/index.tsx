import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import ModalStack, {ModalStackParmList} from './ModalStack';
import {StatusBar} from 'react-native';

export type RootStackParmList = {
  MainStackParmList: ModalStackParmList;
  ModalStackParmList: {
    id: Number;
  };
};

export type MainStackParmList = {
  BottomTabs: undefined;
  Detail: {
    id: Number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParmList>;

const {Navigator, Screen} = createStackNavigator<RootStackParmList>();

const StackNavigator: React.FC = () => (
  <NavigationContainer>
    <Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight,
      }}>
      <Screen
        name="MainStackParmList"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Screen
        name="ModalStackParmList"
        component={ModalStack}
        options={{headerShown: false}}
      />
    </Navigator>
  </NavigationContainer>
);

export default StackNavigator;
