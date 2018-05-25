import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

/*************************************
 * 标签管理
 ************************************/
// 标签分页列表  筛选条件参数：tagName标签名，tagCode标签值，封装在请求体中
export function tagPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_LIST,
        method: 'post',
        data
    });
}

// 保存/编辑 标签 参数：tagName，tagCode，isEnabled(1-生效 2-禁用)，封装在请求体内
export function tagSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE,
        method: 'post',
        data
    });
}

// 禁用/启用标签   参数id(标签id)，封装在请求体内
export function tagSwitchEnable(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SWITCH_ENABLE,
        method: 'post',
        data
    });
}

// 批量删除标签：参数ids（标签id字符串以逗号隔开），封装在请求体内
export function tagDelete(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE,
        method: 'post',
        data
    });
}

// 标签机型关联 分页列表 筛选条件参数：channelCode机型值，channelName机型名，封装在请求体内
export function tagChannelPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_CHANNEL_LIST,
        method: 'post',
        data
    });
}

// 禁用/启用标签机型关联  参数id(标签机型关联列表id)，封装在请求体内
    export function tagSwitchChannelEnabled(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SWITCH_CHANNEL_ENABLED,
        method: 'post',
        data
    });
}

// 批量删除标签机型关联：参数ids(标签机型关联列表id字符串，以逗号隔开)，封装在请求体内
export function tagDeleteChannels(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE_CHANNEL,
        method: 'post',
        data
    });
}

// 批量保存标签机型关联 参数：tagCode标签值，channelCodes（机型值，多选，以逗号隔开） 封装在请求体内
export function tagSaveChannel(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE_CHANNEL,
        method: 'post',
        data
    });
}

// 判断标签值是否重复 参数 tagCode封装在请求体内  返回参数 codeExist(0-不存在 1-已存在)封装在返回data数据中
 export function tagCodeExist(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_CODE_EXIST,
        method: 'post',
        data
    });
}

// 查询未跟指定标签关联的机型列表，分页 参数 tagCode
export function tagOtherChannelPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_OTHER_CHANNEL_LIST,
        method: 'post',
        data
    });
}
