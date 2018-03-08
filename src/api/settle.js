/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: settle.js @author: walljack@163.com @date: 18-3-7 下午5:11 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function settlementPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SETTLE_MENT_LIST,
        method: 'post',
        data
    });
}

export function settleAccountPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SETTLE_ACCOUNT_LIST,
        method: 'post',
        data
    });
}

export function payMentPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_PAY_MENT_LIST,
        method: 'post',
        data
    });
}
export function settleMentDetails(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SETTLE_MENT_DETAILS,
        method: 'post',
        data
    });
}

export function settleAccountOrderPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SETTLE_ACCOUNT_ORDER,
        method: 'post',
        data
    });
}

export function savePayMent(data) {
    return fetch({
        url: apiUrl.API_ADMIN_PAY_MENT_SAVE,
        method: 'post',
        data
    });
}
