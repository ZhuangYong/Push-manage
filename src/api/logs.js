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

export function upTextList(data) {
    return fetch({
        url: apiUrl.API_UP_TEXT_LIST,
        method: 'post',
        data
    });
}

export function upTextUpload(data) {
    return fetch({
        url: apiUrl.API_UP_TEXT_UPLOAD,
        method: 'post',
        data
    });
}

export function upLogUpload(data) {
    return fetch({
        url: apiUrl.API_UP_LOG_UPLOAD,
        method: 'post',
        data
    });
}
