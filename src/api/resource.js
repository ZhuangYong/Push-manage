import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_RESOURCES_PAGE,
        method: 'post',
        data
    });
}

export function detail() {
    return fetch({
        url: apiUrl.API_GET_USER_INFO,
        method: 'post',
        params: {}
    });
}

