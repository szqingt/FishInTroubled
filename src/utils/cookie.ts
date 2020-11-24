import {BASE_URL} from '@config/consts';
import CookieManager from '@react-native-community/cookies';

export const getAllCookie = () => {
  CookieManager.get(BASE_URL).then((cookies) => {
    console.log('CookieManager.get =>', cookies);
  });
};
