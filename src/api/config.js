import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 查询系统配置信息
export function getConfigStatus(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_CONFIG_GET_CONFIG_STATUS,
        method: 'post',
        data,
    });
}

export function page(data) {//列表
    return fetch({
        url: apiUrl.API_CONFIG_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_CONFIG_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_CONFIG_DELETE}${id}`,
        method: 'post',
    });
}
