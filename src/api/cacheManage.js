/**
 * 系统设置-redis缓存管理模块
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 查询下载地址
export function systemRedisGetCacheDownloadUrl(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_GET_CACHE_DOWNLOAD_URL,
        method: 'post',
        data
    });
}

// 获取缓存列表模块
export function systemRedisList(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_LIST,
        method: 'post',
        data
    });
}

// 删除单行缓存模块
export function systemRedisClearCache(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_CLEAR_CACHE,
        method: 'post',
        data
    });
}

// 修改单行缓存模块
export function systemRedisSaveCache(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_SAVE_CACHE,
        method: 'post',
        data
    });
}

// 重建es搜索索引
export function systemRedisDeleteAndCreateIndex(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_DELETE_AND_CREATE_INDEX,
        method: 'post',
        data
    });
}

// 清空所有缓存
export function systemRedisClearAllCache(data) {
    return fetch({
        url: apiUrl.API_SYSTEM_REDIS_CLEAR_ALL_CACHE,
        method: 'post',
        data
    });
}
