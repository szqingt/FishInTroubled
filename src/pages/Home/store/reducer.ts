import {SET_ALBUM_LIST, SET_CAROUSEL_DATA} from './action';
import {IHomeState} from './index';

export interface Album {
  title_file_url: string;
  album_title: string;
  album_id: string;
  is_new: number; // 是否连载 1 是 0 否
  is_free: number; // 是否付费 1 是 0 否
  play_num: number; // 播放数量
  update_time: string; // 更新时间
  replay_num: number; // 评论
  has_article: number; // 文章
  serialize_status: number; // 是否连载
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
