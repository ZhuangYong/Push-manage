import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function page(data) {//列表
    return fetch({
        url: apiUrl.API_CONFIG_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_CONFIG_SAVE,
        method: 'post',
        data
    });
}
