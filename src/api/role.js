import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function getRoleList(data) {//获取用户角色
    return fetch({
        url: apiUrl.API_ALL_ROLE_LIST,
        method: 'post',
        data
    });
}

export function deleteRole(id) {//获取用户角色
    return fetch({
        url: apiUrl.API_ROLE_DELETE + id,
        method: 'post',
    });
}

export function modifyRole(data) {//角色修改或新增
    return fetch({
        url: apiUrl.API_ROLE_MODIFY,
        method: 'post',
        data
    });
}

export function forceDelete(id) {//强制删除橘色
    return fetch({
        url: apiUrl.API_FORCEDELETE_ROLE + id,
        method: 'post'
    });
}

export function getTree(id) {//根据id获取资源树
    return fetch({
        url: apiUrl.API_RESOURCETREE_ROLE + id,
        method: 'post'
    });
}

export function modifyResourceTree(data) {//修改资源树
    return fetch({
        url: apiUrl.API_RESOURCETREE_DELETE,
        method: 'post',
        data
    });
}
