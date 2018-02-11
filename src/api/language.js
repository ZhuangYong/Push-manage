import fetch from '@/utils/fetch';
import apiUrl from "./apiUrl";

export function languagePage(data) {
    return fetch({
        url: apiUrl.API_LANGUAGE_PAGE,
        method: 'post',
        data
    });
}

export function languageResourcesPage(data) {
    return fetch({
        url: apiUrl.API_LANGUAGE_RESOURCE_LIST,
        method: 'post',
        data
    });
}
export function save(data) {
    return fetch({
        url: apiUrl.API_LANGUAGE_SAVE,
        method: 'post',
        data
    });
}


export function languageList(query) {
  return fetch({
    url: apiUrl.API_LANGUAGE_LIST,
    method: 'get',
    params: query
  });
}

