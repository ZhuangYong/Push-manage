import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_APPLY_LIST,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_APPLY_DELETE}${id}`,
        method: 'post',
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_APPLY_SAVE,
        method: 'post',
        data
    });
}
