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
