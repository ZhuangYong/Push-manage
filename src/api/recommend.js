import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function recommendPage(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_LIST,
        method: 'post',
        data
    });
}
export function recommendMediaPage(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_SAVE,
        method: 'post',
        data
    });
}
