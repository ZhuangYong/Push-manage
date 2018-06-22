/*
    * 用户标签管理
    * */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 1.标签分页数据：
// 参数：tagName（标签名），tagCode（标签值），以及分页参数
export function userTagPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_USER_TAG_LIST,
        method: 'post',
        data
    });
}
// 2.获取所有标签：
// 参数：无
export function userTagAllPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_USER_TAG_LIST_ALL,
        method: 'post',
        data
    });
}
// 3.保存/编辑 标签：
// 参数：表单上所有参数（id, tagName, tagCode）
export function userTagSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_USER_TAG_SAVE,
        method: 'post',
        data
    });
}
// 4.删除标签：
// 参数：ids(标签id以“，”隔开的字符串)
export function userTagDelete(data) {
    return fetch({
        url: apiUrl.API_ADMIN_USER_TAG_DELETE,
        method: 'post',
        data
    });
}
// 5.禁用/启用标签：
// 参数：id(标签id)
export function userTagSwitchEnable(data) {
    return fetch({
        url: apiUrl.API_ADMIN_USER_TAG_SWITCH_ENABLE,
        method: 'post',
        data
    });
}
