import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function pushPage(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_PUSH_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_PUSH_SAVE,
        method: 'post',
        data
    });
}

export function pushDelete(id) {
    return fetch({
        url: `${apiUrl.API_WEIXIN_PUSH_DELETE}${id}`,
        method: 'post'
    });
}
