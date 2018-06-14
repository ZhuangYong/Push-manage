/**
 * Created by Zed on 2018/3/20.
 */
/**
 * 系统设置-内网服务器管理接口
 * */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 为指定专网同步系统以及硬件时间 /system/inner/networks/calibratePrivateTime
export function innerNetworksCalibratePrivateTime(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_CALIBRATE_PRIVATE_TIME,
        method: 'post',
        data
    });
}
// 获取指定内网资源版本号/system/inner/networks/getPrivateResourceVersion
export function innerNetworksGetPrivateResourceVersion(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_GET_PRIVATE_RESOURCE_VERSION,
        method: 'post',
        data
    });
}

// 为指定专网同步歌曲资源包/system/inner/networks/sendResourceToPrivate
export function innerNetworksSendResourceToPrivate(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_SEND_RESOURCE_TO_PRIVATE,
        method: 'post',
        data
    });
}

// 推送歌曲
export function innerNetworksSendToPrivate(serialNo) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_SEND_TO_PRIVATE + serialNo,
        method: 'post'
    });
}

// 内网服务器删除
export function innerNetworksDelete(id) {
    const data = {id: id};
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_DELETE,
        method: 'post',
        data
    });
}

// 内网服务器列表
export function innerNetworksList(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_LIST,
        method: 'post',
        data
    });
}

// 内网服务器添加、编辑
export function innerNetworksSave(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_SAVE,
        method: 'post',
        data
    });
}

// 查看专网组下的机型列表
export function innerNetworksChannels(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_CHANNELS,
        method: 'post',
        data
    });
}

// 查看未添加到专网的机型
export function innerNetworksRestChannels(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_REST_CHANNELS,
        method: 'post',
        data
    });
}

// 添加机型到专网组下
export function innerNetworksAddChannels(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_ADD_CHANNELS,
        method: 'post',
        data
    });
}

// 删除专网组下机型
export function innerNetworksDeleteChannels(data) {
    return fetch({
        url: apiUrl.API_INNER_NETWORKS_DELETE_CHANNELS,
        method: 'post',
        data
    });
}
