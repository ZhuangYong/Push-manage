import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_LIST,
        method: 'post',
        data
    });
}

export function add(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_SAVE,
        method: 'post',
        data
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_SAVE,
        method: 'post',
        data
    });
}
