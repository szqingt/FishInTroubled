import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {initState as homeStats} from '@pages/Home/store/reducer';
import {IHomeState} from '@pages/Home/store';
import {ILoadingState, initState as lodingState} from './loading';
import {IUserState, initState as userState} from './user';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {IPlayInfoState, initState as playInfoState} from './playInfo';
let middleware = [thunk];

export interface IStore {
  home: IHomeState;
  loading: ILoadingState;
  user: IUserState;
  palyInfo: IPlayInfoState;
}

const initialState: IStore = {
  home: homeStats,
  loading: lodingState,
  user: userState,
  palyInfo: playInfoState,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(store);

  return {store, persistor};
}

const storeInfo = configureStore();

export const persistor = storeInfo.persistor;

export default storeInfo.store;
