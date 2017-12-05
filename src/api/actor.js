import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function rankPage(data) {
    return fetch({
        url: apiUrl.API_ACTOR_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_ACTOR_SAVE,
        method: 'post',
        data
    });
}
