import {SET_CAROUSEL_DATA} from './index';
import {IHomeState} from './index';

export const initialState: IHomeState = {
  carouselList: [],
};

export default (state = initialState, {type, playload}: IAction<[]>) => {
  switch (type) {
    case SET_CAROUSEL_DATA:
      state = {...state, ...{carouselList: playload}};
      break;

    default:
      return state;
  }

  return state;
};
