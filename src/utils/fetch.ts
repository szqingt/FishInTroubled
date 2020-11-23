import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from '@config/consts';
import store from '@store/index';
import {showLoading, hideLoading} from '@store/loading';

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
    console.log('req config', config);
    if (!config.withoutMask) {
      store.dispatch(showLoading());
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  // @ts-ignore
  function (response: AxiosResponse<DefaultResult<any>>) {
    console.log('res', response);
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
    if (!config.withoutMask) {
      store.dispatch(hideLoading());
    }
    return Promise.reject(error);
  },
);

export default instance;
