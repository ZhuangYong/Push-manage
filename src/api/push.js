import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function pushPage(data) {//列表
    return fetch({
        url: apiUrl.API_PUSH_PAGE,
        method: 'post',
        data
    });
}

export function pushAdd(data) {//增加
    return fetch({
        url: apiUrl.API_PUSH_ADD,
        method: 'post',
        data
    });
}
export function pushSave(data) {//保存
    return fetch({
        url: apiUrl.API_PUSH_SAVE,
        method: 'post',
        data
    });
}

export function pushSeaDevice(data) {//按设备名称搜索
    return fetch({
        url: apiUrl.API_PUSH_SEADEVICE,
        method: 'post',
        data
    });
}

export function pushSeaPage(data) {//查询页面列表
    return fetch({
        url: apiUrl.API_PUSH_SEAPAGE,
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

export function getPushDevice(data) {//设备组列表
    return fetch({
        url: apiUrl.API_DEVICE_DEVICE_LIST,
        method: 'post',
        data
    });
}
