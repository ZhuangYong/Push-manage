import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_PRODUCT_LIST,
        method: 'post',
        data
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_PRODUCT_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_PRODUCT_DELETE}${id}`,
        method: 'post',
    });
}
