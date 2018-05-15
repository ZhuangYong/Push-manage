import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 待添加设备列表 拼在URL后面的参数：userGroupUuid POST过来参数: deviceId,sn
export function getUpgradeGrayDeviceList(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_DEVICE_LIST,
        method: 'post',
        data
    });
}

// 获取设备列表模块 拼在URL后面的参数：userGroupUuid POST过来参数: deviceId
export function getUpgradeGrayUserList(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_USER,
        method: 'post',
        data
    });
}

// 批量删除设备列表模块 拼在URL后面的参数：userGroupUuid POST过来参数: deviceUuids (数组)
export function upgradeGrayUserDelete(userGroupUuid, data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_DELETE_USER + userGroupUuid,
        method: 'post',
        data
    });
}

// 保存设备列表模块 拼在URL后面的参数：userGroupUuid POST过来参数: deviceUuids (数组),deviceId,sn
export function upgradeGrayUserSave(userGroupUuid, data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_SAVE_USER + userGroupUuid,
        method: 'post',
        data
    });
}

export function page(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_LIST,
        method: 'post',
        data
    });
}

export function del(id) {//删除
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_DELETE + id,
        method: 'post'
    });
}

export function getDevice(data) {//获取关联设备
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_ID,
        method: 'post',
        data
    });
}

export function save(data) {//保存
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_SAVE,
        method: 'post',
        data
    });
}


export function saveImg(data) {//保存图片
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_SAVEIMG,
        method: 'post',
        data
    });
}

export function getGroupList() {//组列表
    return fetch({
        url: apiUrl.API_GROUP_GROUPLIST,
        method: 'post'
    });
}

export function getGrayGroupList() {//组列表
    return fetch({
        url: apiUrl.API_GRAY_GROUP_GROUP_LIST,
        method: 'post'
    });
}

export function getAppRomList(data) {//获取app和rom升级列表
    return fetch({
        url: apiUrl.API_UPGRADE_GRAY_APP_ROM,
        method: 'post',
        data
    });
}
