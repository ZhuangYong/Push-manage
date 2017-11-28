import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_EPG_LIST,
        method: 'post',
        data
    });
}

export function epgList() {
    return fetch({
        url: apiUrl.API_EPG_EPGLIST,
        method: 'post'
    });
}
export function add(data) {
    return fetch({
        url: apiUrl.API_EPG_ADD,
        method: 'post',
        data
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_EPG_EDIT,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_EPG_DEL}${id}`,
        method: 'post',
    });
}
