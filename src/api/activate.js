import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 批量激活
export function activateAll(data) {
    return fetch({
        url: apiUrl.API_ADMIN_ACTIVATE_ACTIVATE_ALL,
        method: 'post',
        data
    });
}

export function page(data) {
    return fetch({
        url: apiUrl.API_ACTIVATE_LIST,
        method: 'post',
        data
    });
}

export function activateDayList(data) {
    return fetch({
        url: apiUrl.API_ACTIVATE_DAY_LIST,
        method: 'post',
        data
    });
}
export function getActivateCode(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_GET_ACTIVATE_CODE,
        method: 'post',
        data
    });
}
