import {Dispatch} from 'redux';
import {getUserInfo, login as loginService, LoginParams} from '@services/index';

export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAN_USER_INFO = 'CLEAN_USER_INFO';
export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const CLENA_TOKEN = 'CLENA_TOKEN';

export type SET_USER_INFO = typeof SET_USER_INFO;
export type CLEAN_USER_INFO = typeof CLEAN_USER_INFO;
export type SET_USER_LOGIN = typeof SET_USER_LOGIN;
export type SET_USER_LOGOUT = typeof SET_USER_LOGOUT;
export type SET_TOKEN = typeof SET_TOKEN;
export type CLENA_TOKEN = typeof CLENA_TOKEN;

export interface ISetUserInfoAction {
  type: SET_USER_INFO;
  playload: userInfo;
}

export interface ICleanUserInfoAction {
  type: CLEAN_USER_INFO;
}

export interface ISetUserLoginAction {
  type: SET_USER_LOGIN;
}

export interface ISetUserLogoutAction {
  type: SET_USER_LOGOUT;
}

export interface ISetTokenAction {
  type: SET_TOKEN;
  token: string;
}

// 设置用户信息
export const setUserInfo = (playload: userInfo): ISetUserInfoAction => ({
  type: SET_USER_INFO,
  playload,
});

// 清除用户信息
export const cleanUserInfo = (): ICleanUserInfoAction => ({
  type: CLEAN_USER_INFO,
});

// 设置token
export const setToken = (token: string): ISetTokenAction => ({
  type: SET_TOKEN,
  token,
});

// 登录状态
export const setLogin = (): ISetUserLoginAction => ({
  type: SET_USER_LOGIN,
});

// 登出状态
export const setLogout = (): ISetUserLogoutAction => ({
  type: SET_USER_LOGOUT,
});

// 登录
export const login = (params: LoginParams) => async (dispatch: Dispatch) => {
  const data = await loginService(params);
  const user: IUserState = {
    isLogin: true,
    token: data.token,
    userInfo: data.user,
  };
  const {token, userInfo} = user;
  dispatch(setLogin());
  dispatch(setUserInfo(userInfo));
  dispatch(setToken(token));
};

// 更新userInfo
export const refreshUserInfo = async (dispatch: Dispatch) => {
  getUserInfo()
    .then((data) => {
      dispatch(setUserInfo(data));
    })
    .catch(() => {
      dispatch(setLogout());
    });
};

export interface userInfo {
  account: string;
  areaName: string;
  cash: number;
  createTimeStr?: string;
  email: string;
  forumId?: string;
  gold: number;
  lockCash?: number;
  nickname: string;
  totalGold: number;
  totalListenTime: number;
  totalMoney: number;
  userId: string;
  userNo?: number;
}
export interface IUserState {
  isLogin: boolean;
  token: string;
  userInfo: userInfo;
}

const defaultUserInfo: userInfo = {
  account: '',
  userId: '',
  areaName: '',
  email: '',
  cash: 0,
  totalMoney: 0,
  gold: 0,
  nickname: '',
  totalGold: 0,
  totalListenTime: 0,
};

export const initState: IUserState = {
  isLogin: false,
  token: '',
  userInfo: defaultUserInfo,
};

export type UserAction =
  | ISetUserInfoAction
  | ICleanUserInfoAction
  | ISetUserLoginAction
  | ISetUserLogoutAction
  | ISetTokenAction;

export default (state = initState, action: UserAction): IUserState => {
  switch (action.type) {
    case SET_USER_INFO:
      state.userInfo = action.playload;
      break;
    case CLEAN_USER_INFO:
      state.userInfo = {...defaultUserInfo};
      break;
    case SET_USER_LOGIN:
      state.isLogin = true;
      break;
    case SET_USER_LOGOUT:
      state.isLogin = false;
      state.userInfo = defaultUserInfo;
      state.token = '';
      break;
    case SET_TOKEN:
      state.token = action.token;
      break;
    default:
      return state;
  }

  return {...state};
};
