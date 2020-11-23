import {Dispatch} from 'redux';
import {SET_CAROUSEL_DATA} from './index';
import {search, SearchParams} from '@services/index';

export const getCarousel = (params: SearchParams) => {
  return async (dispatch: Dispatch) => {
    const data: any = await search(params);
    const playload = data?.list?.albumList || [];
    dispatch({type: SET_CAROUSEL_DATA, playload});
  };
};
