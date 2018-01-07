import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function getUserList(data) {
    return fetch({
        url: apiUrl.API_USER_LIST,
        method: 'post',
        data
    });
}

export function deleteUser(id) {
    return fetch({
        url: apiUrl.API_USER_DELETE + id,
        method: 'post'
    });
}

export function updateUser(data) {//修改
    return fetch({
        url: apiUrl.API_USER_UPDATE,
        method: 'post',
        data
    });
}


export function createUser(data) {
    return fetch({
        url: apiUrl.API_USER_CREATE,
        method: 'post',
        data
    });
}

export function checkLoginName(name) {
    return fetch({
        url: apiUrl.API_CHECK_LOGIN_NAME + name,
        method: 'post'
    });
}

export function getRoleList(id) {//根据id获取用户角色
    return fetch({
        url: apiUrl.API_ROLE_LIST + id,
        method: 'post'
    });
}

export function roleModify(data) {//修改用户角色
    return fetch({
        url: apiUrl.API_MODIFY_ROLE,
        method: 'post',
        data
    });
}

export function resetPassword(id) {//重置密码
    return fetch({
        url: apiUrl.API_RESETPASSWORD + id,
        method: 'post'
    });
}

export function superAdminApi(id) {//超级管理员
    return fetch({
        url: apiUrl.API_SUPER_ADMIN + id,
        method: 'post'
    });
}

// export function searchGroupListByCode(code) {//超级管理员
//     return fetch({
//         url: apiUrl.API_SEARCH_GROUP_LIST_BY_CODE + code,
//         method: 'post'
//     });
// }
