import {Dispatch} from 'redux';
import {search, SearchParams} from '@services/index';
import store from '@store/index';

export const SET_CAROUSEL_DATA = 'SET_CAROUSEL_DATA';
export const SET_ALBUM_LIST = 'SET_ALBUM_LIST';

export const getCarousel = (params: SearchParams) => {
  return async (dispatch: Dispatch) => {
    const data: any = await search(params);
    const playload = data?.list?.albumList || [];
    dispatch({type: SET_CAROUSEL_DATA, playload});
  };
};

export interface IQueryParams extends SearchParams {
  loadMore?: boolean;
}

export const queryAlbumList = (params: IQueryParams) => {
  return async (dispatch: Dispatch) => {
    const data: any = await search(params);
    const {home} = store.getState();
    const playload = data?.list?.albumList || [];
    if (params.loadMore) {
      dispatch({
        type: SET_ALBUM_LIST,
        playload: [...playload, ...home.albumList],
      });
    } else {
      dispatch({type: SET_ALBUM_LIST, playload});
    }
  };
};
