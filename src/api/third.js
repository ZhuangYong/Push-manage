/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: third.js @author: walljack@163.com @date: 18-3-15 上午10:41 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_API_LIST,
        method: 'post',
        data
    });
}
export function pageUser(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_USER_LIST,
        method: 'post',
        data
    });
}
export function pageUserChild(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_USER_CHILD_LIST,
        method: 'post',
        data
    });
}
export function pageUserApi(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_USER_API_LIST,
        method: 'post',
        data
    });
}
export function edit(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_API_SAVE,
        method: 'post',
        data
    });
}

export function editUser(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_USER_SAVE,
        method: 'post',
        data
    });
}
export function editUserKey(data) {
    return fetch({
        url: apiUrl.API_ADMIN_THIRD_USER_SAVE_KEY,
        method: 'post',
        data
    });
}
export function del(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_THIRD_API_DELETE}${id}`,
        method: 'post',
    });
}
export function delUser(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_THIRD_USER_DELETE}${id}`,
        method: 'post',
    });
}
export function delUserKey(id) {
    return fetch({
        url: `${apiUrl.API_ADMIN_THIRD_USER_DELETE_KEY}${id}`,
        method: 'post',
    });
}

