import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

/**
 * 设置设备状态模块
 * @param data 三个参数id, status(1启用, -1永久禁用, -2时间禁用), frozenTime
 * @returns {*}
 */

export function groupList(data) {//设备组列表
    return fetch({
        url: apiUrl.API_GRAY_GROUP_LIST,
        method: 'post',
        data
    });
}

export function groupGrayDeviceList(data) {// 查询除灰度组里面能选择的设备列表
    return fetch({
        url: apiUrl.API_GRAY_GROUP_DEVICE_LIST,
        method: 'post',
        data
    });
}

export function groupListSave(data) {// 保存设备分组模块
    return fetch({
        url: apiUrl.API_GRAY_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function groupListDelete(id) {// 删除设备分组模块(path: id)
    return fetch({
        url: apiUrl.API_GRAY_GROUP_DELETE + id,
        method: 'post'
    });
}

export function groupUser(data) {// 获取设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_GRAY_GROUP_USER,
        method: 'post',
        data
    });
}

export function groupDeleteUser(id, data) {// 批量删除设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_GRAY_GROUP_DELETE_USER + id,
        method: 'post',
        data
    });
}

export function groupSaveUser(id, data) {// 保存设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_GRAY_GROUP_SAVE_USER + id,
        method: 'post',
        data
    });
}

export function stbUserList(data) {//设备列表
    return fetch({
        url: apiUrl.API_STBUSER_LIST,
        method: 'post',
        data
    });
}
