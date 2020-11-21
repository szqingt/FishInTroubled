import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@pages/Detail';
import {StatusBar} from 'react-native';

export type RootStackParmList = {
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
      <Screen name="BottomTabs" component={BottomTabs} />
      <Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '详情',
        }}
      />
    </Navigator>
  </NavigationContainer>
);

export default StackNavigator;
