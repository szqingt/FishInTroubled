import {AxiosRequestConfig as ARC} from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig extends ARC {
    withoutMask?: boolean;
  }
}
