import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {initState as homeStats} from '@pages/Home/store/reducer';
import {IHomeState} from '@pages/Home/store';
import {ILoadingState, initState as lodingState} from './loading';
import {IUserState, initState as userState} from './user';
let middleware = [thunk];

export interface IStore {
  home: IHomeState;
  loading: ILoadingState;
  user: IUserState;
}

const initialState: IStore = {
  home: homeStats,
  loading: lodingState,
  user: userState,
};

function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  return store;
}

export default configureStore();
