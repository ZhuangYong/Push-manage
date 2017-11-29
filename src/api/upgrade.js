import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function upPage(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_PAGE,
        method: 'post',
        data
    });
}

export function upDelete(id) {//删除
    return fetch({
        url: apiUrl.API_UPGRADE_DELETE + id,
        method: 'post'
    });
}

export function upAdd(data) {//新增
    return fetch({
        url: apiUrl.API_UPGRADE_ADD,
        method: 'post',
        data
    });
}

export function upEdit(id) {//修改
    return fetch({
        url: apiUrl.API_UPGRADE_EDIT + id,
        method: 'post'
    });
}

export function upSave(data) {//保存
    return fetch({
        url: apiUrl.API_UPGRADE_SAVE,
        method: 'post',
        data
    });
}

export function upSaveImg(data) {//保存图片
    return fetch({
        url: apiUrl.API_UPGRADE_SAVEIMG,
        method: 'post',
        data
    });
}


export function upSearch(code) {//获取机型列表
    return fetch({
        url: apiUrl.API_UPGRADE_SEARCH + code,
        method: 'post'
    });
}
