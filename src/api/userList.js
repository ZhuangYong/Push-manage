import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function userListPage(data) {
    return fetch({
        url: apiUrl.API_USER_LSIT,
        method: 'post',
        data
    });
}

export function userListBind(data) {
    return fetch({
        url: apiUrl.API_USER_BIND,
        method: 'post',
        data
    });
}
