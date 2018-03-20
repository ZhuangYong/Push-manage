/**
 * Created by Zed on 2018/3/20.
 */
/**
 * 系统设置-内网服务器管理接口
 * */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

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
