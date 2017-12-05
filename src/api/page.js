import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function pageList(data) {//列表
    return fetch({
        url: apiUrl.API_PAGE_LIST,
        method: 'post',
        data
    });
}

export function pageAdd(data) {//增加
    return fetch({
        url: apiUrl.API_PAGE_ADD,
        method: 'post',
        data
    });
}
export function pageEdit(id) {//修改
    return fetch({
        url: apiUrl.API_PAGE_EDIT + 'id',
        method: 'post'
    });
}

export function pageSave(data) {//保存
    return fetch({
        url: apiUrl.API_PAGE_SAVE,
        method: 'post',
        data
    });
}
