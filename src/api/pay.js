import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_PAY_SATAISTICS_PAY_DETAIL,
        method: 'post',
        data
    });
}

export function list(data) {
    return fetch({
        url: apiUrl.API_PAY_SATAISTICS,
        method: 'post',
        data
    });
}
