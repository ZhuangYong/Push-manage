import fetch from '@/utils/fetch';
import apiUrl from "./apiUrl";

export function languageList(query) {
  return fetch({
    url: apiUrl.API_LANGUAGE_LIST,
    method: 'get',
    params: query
  });
}

