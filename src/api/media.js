import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function mediaPage(data) {
    return fetch({
        url: apiUrl.API_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_MEDIA_SAVE,
        method: 'post',
        data
    });
}

// 获取所有语言类型列表，不分页
export function mediaLanguageList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MEDIA_LANGUAGE_LIST,
        method: 'post',
        data
    });
}
