/**
 * Created by Zed on 2018/4/4.
 */

import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {
    getRechargeCardList,
    getRechargeCardRecordCardsList,
    getRechargeCardRecordList, getRechargeCardStatistics, getRechargeCardVIPAndChannels
} from "../../api/rechargeCardManage";

/**
 * 充值卡管理模块
 */
const defaultPageData = getDefaultPageData();
export default {
    state: {
        rechargeCardList: defaultPageData,
        rechargeCardRecordList: defaultPageData,
        rechargeCardRecordCardsList: defaultPageData,
        rechargeCardVIPAndChannels: {
            channelNos: [],
            vipDays: [],
        },
        rechargeCardStatistics: {},
    },
    mutations: {
        SET_RECHARGE_CARD_LIST: (state, data) => {
            state.rechargeCardList = data;
        },
        SET_RECHARGE_CARD_RECORD_LIST: (state, data) => {
            state.rechargeCardRecordList = data;
        },
        SET_RECHARGE_CARD_RECORD_CARDS_LIST: (state, data) => {
            state.rechargeCardRecordCardsList = data;
        },
        SET_RECHARGE_CARD_VIP_AND_CHANNELS: (state, data) => {
            state.rechargeCardVIPAndChannels = data;
        },
        SET_RECHARGE_CARD_STATISTICS: (state, data) => {
            state.rechargeCardStatistics = data;
        },
    },
    actions: {
        ['rechargeCard/RefreshPage']: getPageFun('rechargeCardList', getRechargeCardList, 'SET_RECHARGE_CARD_LIST'),
        ['rechargeCard/record/RefreshPage']: getPageFun('rechargeCardRecordList', getRechargeCardRecordList, 'SET_RECHARGE_CARD_RECORD_LIST'),
        ['rechargeCard/recordCards/RefreshPage']: getPageFun('rechargeCardRecordCardsList', getRechargeCardRecordCardsList, 'SET_RECHARGE_CARD_RECORD_CARDS_LIST'),
        ['rechargeCard/vipAndChannels'] ({state, commit}) {
            return new Promise((resolve, reject) => {
                getRechargeCardVIPAndChannels().then(response => {
                    commit('SET_RECHARGE_CARD_VIP_AND_CHANNELS', response);
                    resolve(response);
                }).catch(err => {
                   reject(err);
                });
            });
        },
        ['rechargeCard/statistics'] ({state, commit}) {
            return new Promise((resolve, reject) => {
               getRechargeCardStatistics().then(response => {
                   commit('SET_RECHARGE_CARD_STATISTICS', response);
                   resolve(response);
               }).catch(err => {
                   reject(err);
               });
            });
        },
    }
};
