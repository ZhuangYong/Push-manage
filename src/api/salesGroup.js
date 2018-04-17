/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesGroup.js @author: walljack@163.com @date: 18-3-1 下午2:13 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_LIST,
        method: 'post',
        data
    });
}

export function userPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_USER_LIST,
        method: 'post',
        data
    });
}

export function groupDevicePage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_DEVICE_LIST,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_SALES_AND_GROUP_DELETE}${id}`,
        method: 'post',
    });
}

export function moveGroup(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_MOVE_GROUP,
        method: 'post',
        data
    });
}

export function saveMoveGroup(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_MOVE_GROUP_SAVE,
        method: 'post',
        data
    });
}

/**
 * 参数{“ids”：['要删除的id列表','']}
 * @param data
 * @returns {*}
 */
export function delUser(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_DELETE_USER,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function saveUser(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SALES_AND_GROUP_SAVE_USER,
        method: 'post',
        data
    });
}
