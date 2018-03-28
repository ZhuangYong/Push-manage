/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: sales.js @author: walljack@163.com @date: 18-2-26 上午10:49 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_LIST,
        method: 'post',
        data
    });
}

export function groupPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_GROUP_LIST,
        method: 'post',
        data
    });
}

export function stbUserPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_STB_USER_LIST,
        method: 'post',
        data
    });
}

export function orderPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_ORDER_LIST,
        method: 'post',
        data
    });
}

export function salesDevicePage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_DEVICE_LIST,
        method: 'post',
        data
    });
}
export function del(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_SALES_DELETE}${id}`,
        method: 'post',
    });
}

export function delGroup(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_SALES_GROUP_DELETE}${id}`,
        method: 'post',
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_SAVE,
        method: 'post',
        data
    });
}

export function saveGroup(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function saveDevice(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_SAVE_DEVICE,
        method: 'post',
        data
    });
}

export function searchSalesAndDeviceGroup() {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_SEARCH_SALES_AND_DEVICE_GROUP,
        method: 'post',
    });
}


export function searchDeviceGroupBySalesUUID(id = "") {
    return fetch({
        url: `${apiUrl.API_ADMIN_SALES_SEARCH_DEVICE_GROUP_BY_SALES_UUID}${id}`,
        method: 'post',
    });
}

export function statisticsIndex(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_STATISTICS_INDEX,
        method: 'post',
        data
    });
}

export function statisticsDetail(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_STATISTICS_DETAIL,
        method: 'post',
        data
    });
}
