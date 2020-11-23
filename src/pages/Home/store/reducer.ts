import {SET_CAROUSEL_DATA} from './index';
import {IHomeState} from './index';

export const initState: IHomeState = {
  carouselList: [],
};

export default (state = initState, {type, playload}: IAction<[]>) => {
  switch (type) {
    case SET_CAROUSEL_DATA:
      state = {...state, ...{carouselList: playload}};
      break;

    default:
      return state;
  }

  return state;
};
