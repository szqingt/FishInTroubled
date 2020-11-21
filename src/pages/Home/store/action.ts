import {SEARCH} from '@config/api';
import fetch from '@utils/fetch';
import {Dispatch} from 'redux';
import {SET_CAROUSEL_DATA} from './index';

type Params = {
  keyword: string;
  aclassify_id: number;
  page: number;
};
export const search = (params: Params) => {
  return async (dispatch: Dispatch) => {
    const {
      data: {errCode, data, message},
    } = await fetch.get(SEARCH, {params});
    if (errCode !== 0) {
      console.error(message);
      return;
    }
    const playload = data?.list?.albumList || [];
    dispatch({type: SET_CAROUSEL_DATA, playload});
  };
};
