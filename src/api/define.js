import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function page(data) {//列表
    return fetch({
        url: apiUrl.API_DEFINE_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_DEFINE_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_DEFINE_DELETE}${id}`,
        method: 'post',
    });
}

export function getAllDefine(data) {
    return fetch({
        url: apiUrl.API_DEFINE_DEFINELIST,
        method: 'post',
        data
    });
}
