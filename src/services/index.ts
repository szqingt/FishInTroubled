import {SEARCH} from '@config/api';
import fetch from '@utils/fetch';

export interface SearchParams {
  keyword?: string;
  aclassify_id: number;
  page: number;
}

function search(params: SearchParams = {page: 1, aclassify_id: 3}) {
  return fetch({
    url: SEARCH,
    params,
  });
}

export {search};
