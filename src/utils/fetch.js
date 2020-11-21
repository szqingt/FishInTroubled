import axios from 'axios';
import {BASE_URL} from '@config/env';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use(
  function (config) {
    console.log('req config', config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    console.log('res', response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
