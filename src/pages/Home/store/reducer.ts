import {SET_ALBUM_LIST, SET_CAROUSEL_DATA} from './action';
import {IHomeState} from './index';

export interface Album {
  titleFilePath: string;
  albumName: string;
  albumId: string;
  albumPrice: number; // 专辑价格
  albumFlag: string[]; // 連載中 付費 更新
  playNum: number;
  replyNum: number;
  updateTimeStr: string; // 更新时间
  serializeStatus: number; // 是否连载
  scale: number; // 0 海外
}

export const initState: IHomeState = {
  carouselList: [],
  albumList: [],
};

export default (state = initState, {type, playload}: IAction<[]>) => {
  switch (type) {
    case SET_CAROUSEL_DATA:
      state = {...state, ...{carouselList: playload}};
      break;
    case SET_ALBUM_LIST:
      state = {...state, ...{albumList: playload}};
      break;
    default:
      return state;
  }

  return state;
};
