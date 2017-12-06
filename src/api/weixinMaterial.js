import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function materialPage(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_MATERIAL_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_MATERIAL_SAVE,
        method: 'post',
        data
    });
}

export function materialDelete(id) {
    return fetch({
        url: `${apiUrl.API_WEIXIN_MATERIAL_DELETE}${id}`,
        method: 'post'
    });
}

export function materialSingleDelete(id) {
    return fetch({
        url: `${apiUrl.API_WEIXIN_MATERIAL_DELETE_SINGLE}${id}`,
        method: 'post'
    });
}
