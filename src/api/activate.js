import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ACTIVATE_LIST,
        method: 'post',
        data
    });
}
