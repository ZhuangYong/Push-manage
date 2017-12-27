import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_LIST,
        method: 'post',
        data
    });
}

export function add(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_FUNCTION_CHANNEL_DELETE}${id}`,
        method: 'post'
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_SAVE,
        method: 'post',
        data
    });
}

export function vipGroupList() {
    return fetch({
        url: apiUrl.API_VIP_GROUP_VIPGROUP_LIST,
        method: 'post',
    });
}
