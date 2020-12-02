import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import ModalStack, {ModalStackParmList} from './ModalStack';
import {useSelector} from 'react-redux';
import {statusBarHeight} from '@utils/index';

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
        navigationRef.current.dispatch(
          StackActions.replace('ModalStackParmList', {screen: 'Login'}),
        );
      } else {
        navigationRef.current.dispatch(
          StackActions.replace('MainStackParmList', {screen: 'Home'}),
        );
      }
    }
  }, [isLogin, navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        headerMode="screen"
        screenOptions={{
          headerStatusBarHeight: statusBarHeight,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 60,
          },
        }}>
        <Screen name="MainStackParmList" component={BottomTabs} />
        <Screen
          name="ModalStackParmList"
          options={{headerShown: false}}
          component={ModalStack}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
