import {GET_USER_INFO, LOGIN, SEARCH} from '@config/api';
import fetch from '@utils/fetch';

export interface SearchParams {
  keyword?: string;
  aclassify_id: number;
  page: number;
}

function search(params: SearchParams = {page: 1, aclassify_id: 3}) {
  return fetch({
    url: SEARCH,
    method: 'POST',
    isFormData: true,
    data: params,
    withoutMask: true,
  });
}

export interface LoginParams {
  account: string;
  password: string;
  v_code: string;
  version: 1;
  isWeb: 1;
}

function login(params: LoginParams) {
  return fetch({
    url: LOGIN,
    method: 'POST',
    data: params,
    isFormData: true,
  });
}

function getInfo() {
  return fetch({
    url: GET_USER_INFO,
    method: 'POST',
    isFormData: true,
  });
}

export {search, login, getInfo};
