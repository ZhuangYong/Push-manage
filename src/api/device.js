import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_DEVICE_LIST,
        method: 'post',
        data
    });
}

export function deviceDeviceList() {//获取所有设备信息列表模块
    return fetch({
        url: apiUrl.API_DEVICE_DEVICE_LIST,
        method: 'post'
    });
}

export function pageDeviceUser(data) {
    return fetch({
        url: apiUrl.API_DEVICE_USER,
        method: 'post',
        data
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_DEVICE_SAVE,
        method: 'post',
        data
    });
}

export function editDeviceUser(data) {
    return fetch({
        url: apiUrl.API_DEVICE_SAVE_USER,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_DEVICE_DELETE}${id}`,
        method: 'post',
    });
}

export function delDeviceUser(data) {
    return fetch({
        url: apiUrl.API_DEVICE_DELETE_USER,
        method: 'post',
        data
    });
}
