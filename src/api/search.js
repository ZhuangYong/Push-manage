import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function searchPage(data) {
    return fetch({
        url: apiUrl.API_SEARCH_LIST,
        method: 'post',
        data
    });
}

export function searchSave(data) {
    return fetch({
        url: apiUrl.API_SEARCH_SAVE,
        method: 'post',
        data
    });
}

export function searchDelete(id) {
    return fetch({
        url: `${apiUrl.API_SEARCH_DELETE}${id}`,
        method: 'post'
    });
}
