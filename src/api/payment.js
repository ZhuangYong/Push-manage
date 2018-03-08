/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: payMent.js @author: walljack@163.com @date: 18-3-8 上午11:11 @version: 1.0
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function payMentPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_PAY_MENT_LIST,
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
