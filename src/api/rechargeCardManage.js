/**
 * Created by Zed on 2018/4/4.
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

/**
 * 充值卡管理模块
 */

// 获取批次剩余数量接口：
export function getRechargeCardRestNum(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_GET_REST_NUMBER,
        method: 'post',
        data,
    });
}

// 充值卡列表接口：
export function getRechargeCardList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_LIST,
        method: 'post',
        data,
    });
}
// 获取会员天数和机型号列表接口：
export function getRechargeCardVIPAndChannels(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_VIP_AND_CHANNELS,
        method: 'post',
        data,
    });
}
// 统计充值卡接口：
export function getRechargeCardStatistics(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_STATISTICS,
        method: 'post',
        data,
    });
}
// 充值卡生成记录列表：
export function getRechargeCardRecordList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_RECORD_LIST,
        method: 'post',
        data,
    });
}
// 充值卡生成记录详情接口：
export function getRechargeCardRecordCardsList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_RECORD_CARDS_LIST,
        method: 'post',
        data,
    });
}
// 保存充值卡接口：
export function rechargeCardSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_SAVE,
        method: 'post',
        data,
    });
}
// 导出充值卡接口：
export function rechargeCardExport(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_EXPORT,
        method: 'post',
        data,
    });
}
