/**
 * 系统设置-迁移数据
 */

import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 手动批量迁移
export function migrateBatchMigrate(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MIGRATE_BATCH_MIGRATE,
        method: 'post',
        data
    });
}
export function migrateChannels(data) { // 机型列表
    return fetch({
        url: apiUrl.API_MIGRATE_GET_CHANNELS,
        method: 'post',
        data
    });
}
export function migrateList(data) { // 迁移数据列表
    return fetch({
        url: apiUrl.API_ADMIN_MIGRATE_LIST,
        method: 'post',
        data
    });
}

export function updateMigrate() { // 更新迁移数据列表
    return fetch({
        url: apiUrl.API_ADMIN_MIGRATE_UPDATE_MIGRATE,
        method: 'post',
    });
}

export function doMigrate(data) { // 批量同步
    return fetch({
        url: apiUrl.API_ADMIN_MIGRATE_DO_MIGRATE,
        method: 'post',
        data,
    });
}
