/**
 * Created by Zed on 2018/4/4.
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

/**
 * 充值卡管理模块
 */

// 判断生成充值卡状态：/admin/rechargeCard/updateSaveStatus
export function rechargeUpdateSaveStatus(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_CARD_UPDATE_SAVE_STATUS,
        method: 'post',
        data
    });
}

// 批量删除机型列表 参数为控制码组唯一uuid，拼在url后面，其余参数codes，表示批量选中的机型值，以逗号隔开，封装在请求体内穿过案例
export function rechargeGroupDeleteChannels(data, uuid) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_DELETE_CHANNEL + uuid,
        method: 'post',
        data
    });
}

// 查询所有机型列表  可按名字name 筛选
export function getRechargeGroupChannelList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_CHANNEL_LIST,
        method: 'post',
        data
    });
}
// 批量保存机型 参数为控制码组唯一uuid，拼在url后面，其余参数codes，表示批量选中的机型值，以逗号隔开，封装在请求体内传过来
export function rechargeGroupSaveChannels(data, uuid) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_SAVE_CHANNELS + uuid,
        method: 'post',
        data
    });
}

// 获取分组下的机型列表(path: uuid)
export function getRechargeGroupChannels(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_CHANNELS,
        method: 'post',
        data
    });
}

// 禁用/启用控制码组(path: id)
export function rechargeGroupSwitchEnable(id) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_SWITCH_ENABLE + id,
        method: 'get'
    });
}

// 编辑、新增控制码组：
export function rechargeGroupSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_SAVE,
        method: 'post',
        data,
    });
}

// 控制码组列表：
export function getRechargeGroupList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_RECHARGE_GROUP_LIST,
        method: 'post',
        data,
    });
}

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
