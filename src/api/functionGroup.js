import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function funGroupPage(data) {
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_LIST,
        method: 'post',
        data
    });
}

export function funGroupFunListPage(data) {
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_FUNCTION_LIST,
        method: 'post',
        data
    });
}

export function funGroupGroupListList(data) {
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_GROUP_LIST,
        method: 'post',
        data
    });
}

export function funcSave(data) {//新增
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function funcSaveFunctions(data) {//funcSaveFunctions
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_SAVE_FUNCTION,
        method: 'post',
        data
    });
}

export function funGroupDelete(id) {//删除
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_DELETE + id,
        method: 'post'
    });
}

export function funcDeleteFunctions(data) {
    return fetch({
        url: apiUrl.API_FUNCTION_GROUP_DELETE_FUNCTION,
        method: 'post',
        data
    });
}

