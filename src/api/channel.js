import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_LIST,
        method: 'post',
        data
    });
}

export function manufacturerChannelList(data) {//获取机型列表
    return fetch({
        url: apiUrl.API_CHANNEL_MANUFACTURER_CHANNEL_LIST,
        method: 'post',
        data
    });
}

//移动设备到其他分组
// 获取组列表
export function channelMoveGroups(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_MOVE_GROUPS,
        method: 'post',
        data
    });
}

export function saveMoveChannelDeviceGroups(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_MOVE_GROUPS_SAVE,
        method: 'post',
        data
    });
}

export function saveSelectedDeviceToChannelGroups(data) {
    return fetch({
        url: apiUrl.API_CHANNEL_DEVICE_GROUPS_SELECT_SAVE,
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

export function checkChannelCodeUnique(code) {
    return fetch({
        url: `${apiUrl.API_CHANNEL_CHECK_UNIQUE}${code}`,
        method: 'post',
    });
}
