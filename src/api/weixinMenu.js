import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function menuPage(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_MENU_LIST,
        method: 'post',
        data
    });
}

export function menuTree(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_MENU_TREE,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_MENU_SAVE,
        method: 'post',
        data
    });
}

export function menuDelete(id) {
    return fetch({
        url: `${apiUrl.API_WEIXIN_MENU_DELETE}${id}`,
        method: 'post'
    });
}
