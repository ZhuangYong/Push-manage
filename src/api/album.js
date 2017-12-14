import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function albumPage(data) {
    return fetch({
        url: apiUrl.API_ALBUM_LIST,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_ALBUM_DELETE}${id}`,
        method: 'post',
    });
}

export function disable(id) { //禁用或者启用
    return fetch({
        url: `${apiUrl.API_ALBUM_DISABLE}${id}`,
        method: 'post',
    });
}
