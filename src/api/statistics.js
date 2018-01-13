import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS,
        method: 'post',
        data
    });
}

//查询当前登录用户的机型列表
export function getStatChanList() {
    return fetch({
        url: apiUrl.API_STATISTICS_CHANNEL_LIST,
        method: 'post'
    });
}

// 查询当前登录用户的机型列表和设备组列
export function searchChannelAndDeviceGroup() {
    return fetch({
        url: apiUrl.API_STATISTICS_SEARCH_CHANNEL_DEVICE_GROUP,
        method: 'post'
    });
}
//激活码统计列表
export function getStatActive() {
    return fetch({
        url: apiUrl.API_STATISTICS_ACTIVATE,
        method: 'post'
    });
}

