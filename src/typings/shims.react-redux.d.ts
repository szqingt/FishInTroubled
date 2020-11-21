import {IStore} from '@store/index';
declare module 'react-redux' {
  interface DefaultRootState extends IStore {}
}
