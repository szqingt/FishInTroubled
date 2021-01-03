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
    userInfo: data.staff,
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
      const {staff} = data;
      dispatch(setUserInfo(staff));
    })
    .catch(() => {
      dispatch(setLogout());
    });
};

export interface userInfo {
  account: string;
  anchor_name: string | null;
  avater_file_url: string | null;
  countryName: string;
  email?: string;
  fans_lv: number | null;
  gold: number;
  is_ip_out: number;
  is_locked: number;
  is_out: number;
  nickname: string;
  role_id: string;
  role_name: string;
  staff_name: string;
  staff_id: string;
  total_gold: number;
  total_listen_time: number;
}
export interface IUserState {
  isLogin: boolean;
  token: string;
  userInfo: userInfo;
}

const defaultUserInfo: userInfo = {
  account: '',
  anchor_name: null,
  avater_file_url: null,
  countryName: '',
  email: '',
  fans_lv: null,
  gold: 0,
  is_ip_out: 0,
  is_locked: 0,
  is_out: 0,
  nickname: '',
  role_id: '',
  role_name: '',
  staff_id: '',
  staff_name: '',
  total_gold: 0,
  total_listen_time: 0,
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
