import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_APPLY_LIST,
        method: 'post',
        data
    });
}

export function groupPage(data) {
    return fetch({
        url: apiUrl.API_APP_GROUP_LIST,
        method: 'post',
        data
    });
}

export function groupApplyPage(data) {
    return fetch({
        url: apiUrl.API_APP_GROUP_APPLY_LIST,
        method: 'post',
        data
    });
}
export function del(id) {
    return fetch({
        url: `${apiUrl.API_APPLY_DELETE}${id}`,
        method: 'post',
    });
}

export function delGroup(id) {
    return fetch({
        url: `${apiUrl.API_APP_GROUP_DELETE}${id}`,
        method: 'post',
    });
}

export function delAppInGroup(data) {
    return fetch({
        url: apiUrl.API_APP_GROUP_APPLY_DELETE,
        method: 'post',
        data
    });
}
export function save(data) {
    return fetch({
        url: apiUrl.API_APPLY_SAVE,
        method: 'post',
        data
    });
}

export function saveGroup(data) {
    return fetch({
        url: apiUrl.API_APP_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function saveGroupApp(data) {
    return fetch({
        url: apiUrl.API_APP_GROUP_APP_SAVE,
        method: 'post',
        data
    });
}
