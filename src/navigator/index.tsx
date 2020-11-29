import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import ModalStack, {ModalStackParmList} from './ModalStack';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

export type RootStackParmList = {
  MainStackParmList: MainStackParmList;
  ModalStackParmList: ModalStackParmList;
};

export type MainStackParmList = {
  BottomTabs: undefined;
  Detail: {
    id: Number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParmList>;

const {Navigator, Screen} = createStackNavigator<RootStackParmList>();

const StackNavigator: React.FC = () => {
  const {isLogin} = useSelector((store) => store.user);
  const navigationRef = useRef<NavigationContainerRef>(null);

  useEffect(() => {
    if (navigationRef.current) {
      if (!isLogin) {
        navigationRef.current.navigate('ModalStackParmList', {screen: 'Login'});
      } else {
        navigationRef.current.navigate('MainStackParmList', {screen: 'Home'});
      }
    }
  }, [isLogin, navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        headerMode="float"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStatusBarHeight: StatusBar.currentHeight,
        }}>
        <Screen
          name="ModalStackParmList"
          component={ModalStack}
          options={{headerShown: false}}
        />
        <Screen
          name="MainStackParmList"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
