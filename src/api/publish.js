import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_PUBLISH_LIST,
        method: 'post',
        data
    });
}

export function add(data) {
    return fetch({
        url: apiUrl.API_EPG_ADD,
        method: 'post',
        data
    });
}

export function edit(data) {
    return fetch({
        url: apiUrl.API_PUBLISH_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_PUBLISH_DELETE}${id}`,
        method: 'post',
    });
}

export function getPublishChannel(data) { //这里单独获取机型，和系统管理下的机型列表不一致
    return fetch({
        url: apiUrl.API_PUBLISH_CHANNEL_LIST,
        method: 'post',
        data
    });
}

export function getPublishChangeChannelList() { // 切换机型列表

    return fetch({
        url: apiUrl.API_PUBLISH_CHANGE_CHANNEL_LIST,
        method: 'post'
    });
}
