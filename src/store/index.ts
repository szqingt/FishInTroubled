import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {initialState as homeStats} from '@pages/Home/store/reducer';
import {IHomeState} from '@pages/Home/store';
let middleware = [thunk];

export interface IStore {
  home: IHomeState;
}

const initialState: IStore = {
  home: homeStats,
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  return store;
}
