import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function rankPage(data) {
    return fetch({
        url: apiUrl.API_RANK_LIST,
        method: 'post',
        data
    });
}
export function rankMediaPage(data) {
    return fetch({
        url: apiUrl.API_RANK_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_RANK_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_RANK_DELETE}${id}`,
        method: 'post',
    });
}

export function saveSongs(data, id) {
    return fetch({
        url: `${apiUrl.API_RANK_SAVE_SONGS}${id}`,
        method: 'post',
        data
    });
}

export function delSongs(data, id) {
    return fetch({
        url: `${apiUrl.API_RANK_DELETE_SONGS}${id}`,
        method: 'post',
        data
    });
}
