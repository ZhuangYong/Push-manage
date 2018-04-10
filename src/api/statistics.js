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

export function shareStatisticsList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS_SHARE_LIST,
        method: 'post',
        data
    });
}
export function statisticsList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS_LIST,
        method: 'post',
        data
    });
}
export function statisticsDetail(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS_DETAIL,
        method: 'post',
        data
    });
}
export function shareStatisticsList2(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS_SHARE_LIST2,
        method: 'post',
        data
    });
}
export function shareStatisticsDetail(data) {
    return fetch({
        url: apiUrl.API_ADMIN_STATISTICS_SHARE_DETAIL,
        method: 'post',
        data
    });
}

export function operateShareStatisticsList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_OPERATE_STATISTICS_SHARE_LIST,
        method: 'post',
        data
    });
}
export function operateStatisticsIndexList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_OPERATE_STATISTICS_LIST,
        method: 'post',
        data
    });
}
export function operateStatisticsIndexDetail(data) {
    return fetch({
        url: apiUrl.API_ADMIN_OPERATE_STATISTICS_DETAIL,
        method: 'post',
        data
    });
}

export function operateShareStatisticsListDetail(data) {
    return fetch({
        url: apiUrl.API_ADMIN_OPERATE_STATISTICS_SHARE_LIST_DETAIL,
        method: 'post',
        data
    });
}
export function operateStatisticsList(data) {
    return fetch({
        url: apiUrl.API_PAY_SATAISTICS_OPERATE_LIST,
        method: 'post',
        data
    });
}
