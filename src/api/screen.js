import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function list() {
    return fetch({
        url: apiUrl.API_SCREEN_LIST,
        method: 'post'
    });
}

export function page(data) {
    return fetch({
        url: apiUrl.API_SCREEN_PAGE,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_SCREEN_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_SCREEN_DELETE}${id}`,
        method: 'post',
    });
}
