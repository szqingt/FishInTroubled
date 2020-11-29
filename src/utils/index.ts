import {Dimensions, StatusBar} from 'react-native';
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

const statusBarHeight = StatusBar.currentHeight;

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
