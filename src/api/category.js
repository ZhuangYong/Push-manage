import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_TYPE_LIST,
        method: 'post',
        data
    });
}
export function categoryMediaPage(data) {
    return fetch({
        url: apiUrl.API_TYPE_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function add(data) {
    return fetch({
        url: apiUrl.API_TYPE_SAVE,
        method: 'post',
        data
    });
}
