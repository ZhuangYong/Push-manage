import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function recommendPage(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_LIST,
        method: 'post',
        data
    });
}
export function recommendMediaPage(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_RECOMMEND_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_RECOMMEND_DELETE}${id}`,
        method: 'post',
    });
}

export function saveSongs(data, id) {
    return fetch({
        url: `${apiUrl.API_RECOMMEND_SAVE_SONGS}${id}`,
        method: 'post',
        data
    });
}

export function delSongs(data, id) {
    return fetch({
        url: `${apiUrl.API_RECOMMEND_DELETE_SONGS}${id}`,
        method: 'post',
        data
    });
}
