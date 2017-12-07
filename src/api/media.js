import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function mediaPage(data) {
    return fetch({
        url: apiUrl.API_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_MEDIA_SAVE,
        method: 'post',
        data
    });
}
