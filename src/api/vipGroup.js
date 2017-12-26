import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function page(data) {//产品分组
    return fetch({
        url: apiUrl.API_VIP_GROUP_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_VIP_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: `${apiUrl.API_VIP_GROUP_DELETE}${id}`,
        method: 'post'
    });
}

export function productPage(data) {//子产品分组
    return fetch({
        url: apiUrl.API_VIP_GROUP_PRODUCT,
        method: 'post',
        data
    });
}

export function productSave(data) {
    return fetch({
        url: apiUrl.API_VIP_GROUP_SAVE_PRODUCT,
        method: 'post',
        data
    });
}

export function productDel(id) {
    return fetch({
        url: `${apiUrl.AP_VIP_GROUP_DELETE_PRODUCT}${id}`,
        method: 'post'
    });
}

export function saveImg(data) {
    return fetch({
        url: apiUrl.API_VIP_GROUP_SAVE_IMG,
        method: 'post',
        data
    });
}

export function productDiscountProductList(data) {// 获取模板产品列表
    return fetch({
        url: apiUrl.API_PRODUCT_PRODUCT_LIST,
        method: 'post',
        data
    });
}
