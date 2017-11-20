import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function resourceDelete(id) {//删除
    return fetch({
        url: apiUrl.API_RESOURCE_DELETE + id,
        method: 'post'
    });
}


export function resourceForceDelete(id) {//强制删除
    return fetch({
        url: apiUrl.API_RESOURCE_FORCEDELETE + id,
        method: 'post'
    });
}

export function resouceModify(data) {//修改新增
    return fetch({
        url: apiUrl.API_RESOURCE_MOIFY,
        method: 'post',
        data
    });
}

export function resourceList(data) {//修改新增
    return fetch({
        url: apiUrl.API_RESOURCE_LIST,
        method: 'post',
        data
    });
}

export function resourceTree(data) {//修改新增
    return fetch({
        url: apiUrl.API_RESOURCE_TREE,
        method: 'post',
        data
    });
}
