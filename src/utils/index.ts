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

export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  statusBarHeight,
  transfromFromData,
};
