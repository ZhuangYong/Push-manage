/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturer.js @author: walljack@163.com @date: 18-2-27 下午4:05 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MANUFACTURER_LIST,
        method: 'post',
        data
    });
}

export function channelPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MANUFACTURER_CHANNEL_LIST,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_MANUFACTURER_DELETE}${id}`,
        method: 'post',
    });
}

export function delChannel(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_MANUFACTURER_CHANNEL_DELETE}${id}`,
        method: 'post',
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MANUFACTURER_SAVE,
        method: 'post',
        data
    });
}

export function saveChannel(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MANUFACTURER_CHANNEL_SAVE,
        method: 'post',
        data
    });
}
