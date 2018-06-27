import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

//  5.备注项可编辑（类似：设备列表-->查看-->修改备注）,接口如下：
// (1)接口路径：/admin/user/editRemark
// (2)参数：remark, openid
export function userListEditRemark(data) {
    return fetch({
        url: apiUrl.API_USER_EDIT_REMARK,
        method: 'post',
        data
    });
}
//  7.获取用户的标签分页数据：
// (1)接口路径：/admin/user/tagList
// (2)参数：tagName(标签名)，tagCode(标签值)，分页
export function userListTagPage(data) {
    return fetch({
        url: apiUrl.API_USER_TAG_LIST,
        method: 'post',
        data
    });
}
// 8.批量删除用户的标签：
// (1)接口路径：/admin/user/deleteTag
// (2)参数：ids(列表id字符串以逗号隔开)
export function userDeleteTags(data) {
    return fetch({
        url: apiUrl.API_USER_DELETE_TAG,
        method: 'post',
        data
    });
}

// 批量打标签:wxUserId（用户列表id字符串以逗号隔开）,tagCodes（标签值tagCode字符串以逗号隔开）
export function userSaveTags(data) {
    return fetch({
        url: apiUrl.API_USER_SAVE_TAGS,
        method: 'post',
        data
    });
}

export function userListPage(data) {
    return fetch({
        url: apiUrl.API_USER_LSIT,
        method: 'post',
        data
    });
}

export function userListBind(data) {
    return fetch({
        url: apiUrl.API_USER_BIND,
        method: 'post',
        data
    });
}

// 微信发消息给用户模块:/admin/user/sendMsg
export function userSendMsg(data) {
    return fetch({
        url: apiUrl.API_USER_SEND_MSG,
        method: 'post',
        data
    });
}
