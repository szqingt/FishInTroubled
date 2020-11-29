import home, {Album} from '@pages/Home/store/reducer';

export interface IHomeState {
  carouselList: [];
  albumList: Album[];
}
export default {
  home,
};
