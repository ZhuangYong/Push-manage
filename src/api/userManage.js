import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function stbUserList(data) {//设备列表
    return fetch({
        url: apiUrl.API_STBUSER_LIST,
        method: 'post',
        data
    });
}

export function stbUserLogin(id) {//设备登录信息
    return fetch({
        url: apiUrl.API_STBUSER_LOGIN + id,
        method: 'post'
    });
}

export function stbUserUser(data) {//绑定设备（微信点歌模块）模块
    return fetch({
        url: apiUrl.API_STBUSER_USER,
        method: 'post',
        data
    });
}

export function stbUserOrder(data) {//支付记录模块
    return fetch({
        url: apiUrl.API_STBUSER_ORDER,
        method: 'post',
        data
    });
}

export function stbUserUserSound(data) {//设备录音数据模块
    return fetch({
        url: apiUrl.API_STBUSER_USER_SOUND,
        method: 'post',
        data
    });
}

export function stbUserActivateRecord(data) {//激活码记录模块
    return fetch({
        url: apiUrl.API_STBUSER_ACTIVATE_RECORD,
        method: 'post',
        data
    });
}

export function stbUserMessage(data) {//消息列表模块
    return fetch({
        url: apiUrl.API_STBUSER_MESSAGE,
        method: 'post',
        data
    });
}

export function orderList(data) {//订单列表
    return fetch({
        url: apiUrl.API_ORDER_LIST,
        method: 'post',
        data
    });
}

export function groupList(data) {//设备组列表
    return fetch({
        url: apiUrl.API_GROUP_LIST,
        method: 'post',
        data
    });
}
