import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  NavigationState,
  StackActions,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import ModalStack, {ModalStackParmList} from './ModalStack';
import {useSelector} from 'react-redux';
import {
  findRouteNameFromNavigatorState,
  navigateDispatch,
  navigationRef,
} from '@utils/index';
import MainStack, {MainStackParmList} from './MainStack';
import PlayButtonView from '@pages/PlayButtonView';

export type RootStackParmList = {
  MainStackParmList: MainStackParmList;
  ModalStackParmList: ModalStackParmList;
};

export type RootStackNavigation = StackNavigationProp<RootStackParmList>;

const {Navigator, Screen} = createStackNavigator<RootStackParmList>();

const StackNavigator: React.FC = () => {
  const {isLogin} = useSelector((store) => store.user);
  const [activeScreenName, setName] = useState('');

  useEffect(() => {
    if (!isLogin) {
      navigateDispatch(
        StackActions.replace('ModalStackParmList', {screen: 'Login'}),
      );
    } else {
      navigateDispatch(
        StackActions.replace('MainStackParmList', {screen: 'Home'}),
      );
    }
  }, [isLogin]);

  const stateChange = (state: NavigationState | undefined) => {
    setName(findRouteNameFromNavigatorState(state));
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={stateChange}>
      <Navigator headerMode="screen">
        <Screen
          name="MainStackParmList"
          component={MainStack}
          options={{headerShown: false}}
        />
        <Screen
          name="ModalStackParmList"
          options={{headerShown: false}}
          component={ModalStack}
        />
      </Navigator>
      <PlayButtonView activeScreenName={activeScreenName} />
    </NavigationContainer>
  );
};

export default StackNavigator;
