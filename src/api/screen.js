import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page() {
    return fetch({
        url: apiUrl.API_SCREEN_LIST,
        method: 'post'
    });
}

