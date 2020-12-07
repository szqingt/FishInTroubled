import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from '@config/consts';
import store from '@store/index';
import {showLoading, hideLoading} from '@store/loading';
import {transfromFromData} from './index';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

const SUCCESS_CODE = 0;

export interface DefaultResult<T> {
  data: T;
  errCode: Number;
  message: string | null;
  success: Boolean;
}

instance.interceptors.request.use(
  function (config) {
    if (!config.withoutMask) {
      store.dispatch(showLoading());
    }
    const {user} = store.getState();
    if (user.isLogin) {
      config.headers = {
        ...config.headers,
        'x-basis-app-token': user.token,
      };
    }
    if (config.isFormData) {
      if (config.data) {
        config.data = transfromFromData(config.data);
      }
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    console.log(config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  // @ts-ignore
  function (response: AxiosResponse<DefaultResult<any>>) {
    const {config, data} = response;
    if (!config.withoutMask) {
      store.dispatch(hideLoading());
    }

    if (data.errCode === SUCCESS_CODE) {
      return data.data;
    }
    return Promise.reject<AxiosResponse>(response);
  },
  function (error) {
    const {config} = error;
    if (config && !config.withoutMask) {
      store.dispatch(hideLoading());
    }
    return Promise.reject(error);
  },
);

export default instance;
