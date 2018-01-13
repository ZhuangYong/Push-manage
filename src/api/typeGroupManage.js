
/**
 * 运营管理-分类组管理
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 查询分类组所有列表模块
export function adminTypeGroupGroupList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TYPE_GROUP_GROUP_LIST,
        method: 'post',
        data
    });
}

// 分类组管理接口
export function adminTypeGroupList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TYPE_GROUP_LIST,
        method: 'post',
        data
    });
}

// 保存分类组模块
export function adminTypeGroupSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TYPE_GROUP_SAVE,
        method: 'post',
        data
    });
}

// 删除分类组模块(path: id)
export function adminTypeGroupDelete(id) {
    return fetch({
        url: apiUrl.API_ADMIN_TYPE_GROUP_DELETE + id,
        method: 'post'
    });
}
