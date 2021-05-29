import {
  BUY_ALBUM,
  BUY_PROGRAM,
  GET_ALBUM_INFO,
  GET_BACK_PASSWORD,
  GET_PROGRAM_INFO,
  GET_PROGRAM_LIST,
  GET_USER_INFO,
  LOGIN,
  SEARCH,
} from '@config/api';
import fetch from '@utils/fetch';

export interface SearchParams {
  keyword?: string;
  pageIndex: number;
}

function search(params: SearchParams = {pageIndex: 1}) {
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
  passwordMd5: string;
  version: string;
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

function getUserInfo() {
  return fetch({
    url: GET_USER_INFO,
    method: 'POST',
    isFormData: true,
  });
}

function findPassword(data: {account: string}) {
  return fetch({
    url: GET_BACK_PASSWORD,
    method: 'POST',
    isFormData: true,
    data,
  });
}

function getAlbumInfo(id: string) {
  return fetch<AlbumInfo>({
    url: GET_ALBUM_INFO,
    method: 'POST',
    isFormData: true,
    data: {
      albumId: id,
    },
  });
}

function bugAlbum(id: string) {
  return fetch({
    url: BUY_ALBUM,
    method: 'POST',
    isFormData: true,
    data: {
      albumId: id,
    },
  });
}

function buyProgram(id: string) {
  return fetch({
    url: BUY_PROGRAM,
    method: 'POST',
    isFormData: true,
    data: {
      programId: id,
    },
  });
}

export interface QueryProgramParams {
  albumId: string;
  pageIndex: number;
}

export interface ProgramApiResult {
  current: number;
  size: number;
  pages: number;
  total: number;
  records: Progrma[];
}

function getProgramList(params: QueryProgramParams) {
  return fetch<ProgramApiResult>({
    url: GET_PROGRAM_LIST,
    method: 'POST',
    isFormData: true,
    data: params,
  });
}

function getProgramInfo(programId: string) {
  return fetch<Progrma>({
    url: GET_PROGRAM_INFO,
    method: 'POST',
    isFormData: true,
    data: {
      programId,
    },
  });
}

export {
  search,
  login,
  getUserInfo,
  findPassword,
  getAlbumInfo,
  bugAlbum,
  getProgramList,
  buyProgram,
  getProgramInfo,
};
