import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function stbUserList(data) {//设备列表
    return fetch({
        url: apiUrl.API_STBUSER_LIST,
        method: 'post',
        data
    });
}

export function stbUserSaveActivate(data) {// 保存激活模块
    return fetch({
        url: apiUrl.API_STBUSER_SAVE_ACTIVATE,
        method: 'post',
        data
    });
}

/**
 * 设置设备状态模块
 * @param data 三个参数id, status(1启用, -1永久禁用, -2时间禁用), frozenTime
 * @returns {*}
 */
export function setDeviceStatus(data) {
    return fetch({
        url: apiUrl.API_STBUSER_SAVE_VIEW,
        method: 'post',
        data
    });
}

export function banVIP(id) {// 恢复/禁用vip模块
    return fetch({
        url: apiUrl.API_STBUSER_DISABLE_VIP + id,
        method: 'post'
    });
}

export function setDeviceFilter(id) {// 恢复/禁用过滤模块
    return fetch({
        url: apiUrl.API_STBUSER_FILTER + id,
        method: 'post'
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

export function orderSave(data) {//处理未付款订单
    return fetch({
        url: apiUrl.API_ORDER_SAVE,
        method: 'post',
        data
    });
}

export function groupList(data) {//设备组列表
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_LIST,
        method: 'post',
        data
    });
}

export function groupListSave(data) {// 保存设备分组模块
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function groupListDelete(id) {// 删除设备分组模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_DELETE + id,
        method: 'post'
    });
}

export function groupUser(data) {// 获取设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_USER,
        method: 'post',
        data
    });
}

export function groupDeleteUser(id, data) {// 批量删除设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_DELETE_USER + id,
        method: 'post',
        data
    });
}

export function groupSaveUser(id, data) {// 保存设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_SAVE_USER + id,
        method: 'post',
        data
    });
}
