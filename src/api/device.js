import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_DEVICE_LIST,
        method: 'post',
        data
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

export function editUser(data) {
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
