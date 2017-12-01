import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function payActivateLogPage(data) {
    return fetch({
        url: apiUrl.API_LOG_PAY_ACTIVATE_LIST,
        method: 'post',
        data
    });
}

export function registerLogPage(data) {
    return fetch({
        url: apiUrl.API_LOG_REGISTER_LIST,
        method: 'post',
        data
    });
}

export function uploadLogPage(data) {
    return fetch({
        url: apiUrl.API_LOG_UPLOAD_LIST,
        method: 'post',
        data
    });
}

export function synchLogPage(data) {
    return fetch({
        url: apiUrl.API_LOG_SYNCH_LIST,
        method: 'post',
        data
    });
}
