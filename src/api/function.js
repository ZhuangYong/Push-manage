import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function funPage(data) {
    return fetch({
        url: apiUrl.API_FUNCTION_PAGE,
        method: 'post',
        data
    });
}

export function funDelete(id) {//删除
    return fetch({
        url: apiUrl.API_FUNCTION_DELETE + id,
        method: 'post'
    });
}

export function funeAdd(data) {//新增
    return fetch({
        url: apiUrl.API_FUNCTION_ADD,
        method: 'post',
        data
    });
}

export function funeEdit(id) {//修改
    return fetch({
        url: apiUrl.API_FUNCTION_ADD + id,
        method: 'post'
    });
}

export function funeSave(data) {//修改
    return fetch({
        url: apiUrl.API_FUNCTION_SAVE,
        method: 'post',
        data
    });
}

export function funChannelList(data) {//获取机型列表
    return fetch({
        url: apiUrl.API_FUNCTION_CHANNLE,
        method: 'post',
        data
    });
}

export function funPageList(data) {//获取页面列表
    return fetch({
        url: apiUrl.API_FUNCTION_PAGELIST,
        method: 'post',
        data
    });
}
