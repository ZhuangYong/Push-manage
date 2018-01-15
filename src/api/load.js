import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_LOAD_LIST,
        method: 'post',
        data
    });
}
export function listLoad() {
    return fetch({
        url: apiUrl.API_LOAD_LOAD_LIST,
        method: 'post',
    });
}
export function edit(data) {
    return fetch({
        url: apiUrl.API_LOAD_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_LOAD_DELETE}${id}`,
        method: 'post',
    });
}

