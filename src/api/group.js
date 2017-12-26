import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function groupPage(data) {
    return fetch({
        url: apiUrl.API_GROUP_LIST,
        method: 'post',
        data
    });
}

export function groupActorPage(data) {
    return fetch({
        url: apiUrl.API_GROUP_ACTOR_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_GROUP_DELETE}${id}`,
        method: 'post',
    });
}

export function groupMediaPage(data) {
    return fetch({
        url: apiUrl.API_GROUP_MEDIA,
        method: 'post',
        data
    });
}

export function groupSaveImg(data) {
    return fetch({
        url: apiUrl.API_GROUP_SAVE_IMG,
        method: 'post',
        data
    });
}
