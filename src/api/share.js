import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_PROMOTION_SHARE_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_PROMOTION_SHARE_SAVE,
        method: 'post',
        data
    });
}

export function del(id) {
    return fetch({
        url: apiUrl.API_PROMOTION_SHARE_DELETE + id,
        method: 'post'
    });
}

export function delMarket(id) {
    return fetch({
        url: apiUrl.API_PORMOTION_SHARE_DELETE_MARKET + id,
        method: 'post'
    });
}

export function saveMarket(data) {
    return fetch({
        url: apiUrl.API_PROMOTION_SHARE_SAVE_MARKET,
        method: 'post',
        data
    });
}

export function getMarketlist(id) {
    return fetch({
        url: apiUrl.API_PORMOTION_SHARE_MARKET_LIST + id,
        method: 'post'
    });
}

export function productDiscountDelete(id) {// 删除产品模块（path: id)
    return fetch({
        url: apiUrl.API_PRODUCT_DISCOUNT_DELETE + id,
        method: 'post'
    });
}

export function productDiscountList(data) {// 获取分页数据
    return fetch({
        url: apiUrl.API_PRODUCT_DISCOUNT_LIST,
        method: 'post',
        data
    });
}

export function productDiscountProductList(data) {// 获取模板产品列表
    return fetch({
        url: apiUrl.API_PRODUCT_DISCOUNT_PRODUCT_LIST,
        method: 'post',
        data
    });
}

export function productDiscountSave(data) {// 保存产品模块
    return fetch({
        url: apiUrl.API_PRODUCT_DISCOUNT_SAVE,
        method: 'post',
        data
    });
}

