import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_LIST,
        method: 'post',
        data
    });
}

export function del(id) {//删除
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_DELETE + id,
        method: 'post'
    });
}

export function getDevice(data) {//获取关联设备
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_ID,
        method: 'post',
        data
    });
}

export function save(data) {//保存
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_SAVE,
        method: 'post',
        data
    });
}


export function saveImg(data) {//保存图片
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_SAVEIMG,
        method: 'post',
        data
    });
}

export function getGroupList() {//组列表
    return fetch({
        url: apiUrl.API_GROUP_GROUPLIST,
        method: 'post'
    });
}

export function getAppRomList(data) {//获取app和rom升级列表
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_APP_ROM,
        method: 'post',
        data
    });
}
