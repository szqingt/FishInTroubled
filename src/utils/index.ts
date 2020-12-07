import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {RootStackParmList} from 'navigator';
import React from 'react';
import {Dimensions, Platform, StatusBar} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function reversPercen(val: number): number {
  return Math.round(val / 100);
}

function wp(percentage: number) {
  return reversPercen(percentage * viewportWidth);
}

function hp(percentage: number) {
  return reversPercen(percentage * viewportHeight);
}

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (viewportHeight === 780 ||
    viewportWidth === 780 ||
    viewportHeight === 812 ||
    viewportWidth === 812 ||
    viewportHeight === 844 ||
    viewportWidth === 844 ||
    viewportHeight === 896 ||
    viewportWidth === 896 ||
    viewportHeight === 926 ||
    viewportWidth === 926);

const statusBarHeight = Platform.select({
  ios: isIphoneX ? 30 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

function transfromFromData(data: any): FormData {
  const params = new FormData();
  Object.keys(data).forEach((key) => {
    params.append(key, data[key]);
  });
  return params;
}

const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: keyof RootStackParmList, params?: any) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

function navigateDispatch(params?: any) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(params);
  }
}

// 获取当前screen 的name
function findRouteNameFromNavigatorState(
  state: NavigationState | undefined,
): string {
  if (!state) {
    return '';
  }
  const {routes, index} = state;

  let route = routes[index];
  while (route.state) {
    route = (route.state as NavigationState).routes[
      (route.state as NavigationState).index
    ];
  }
  return route.name;
}

function getRandomColor() {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  statusBarHeight,
  transfromFromData,
  navigationRef,
  navigate,
  navigateDispatch,
  findRouteNameFromNavigatorState,
  getRandomColor,
};
