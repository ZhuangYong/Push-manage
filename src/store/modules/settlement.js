/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: settle.js @author: walljack@163.com @date: 18-3-7 下午5:15 @version: 1.0
 */

import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {settleAccountOrderPage, settleAccountPage, settleMentDetails, settlementPage} from "../../api/settlement";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        settlementPage: defaultPageData,
        settleMentDetails: defaultPageData,
        settleAccountPage: defaultPageData,
        settleAccountOrderPage: defaultPageData,
    },
    mutations: {
        SET_SETTLEMENT_PAGE: (state, data) => {
            state.settlementPage = data;
        },
        SET_SETTLEMENT_DETAIL_PAGE: (state, data) => {
            state.settleMentDetails = data;
        },
        SET_SETTLEMENT_ACCOUNT_PAGE: (state, data) => {
            state.settleAccountPage = data;
        },
        SET_SETTLEMENT_ACCOUNT_ORDER_PAGE: (state, data) => {
            state.settleAccountOrderPage = data;
        },
    },

    actions: {
        ['settlement/RefreshPage']: getPageFun('settlementPage', settlementPage, 'SET_SETTLEMENT_PAGE'),
        ['settlement/detail/RefreshPage']: getPageFun('settleMentDetails', settleMentDetails, 'SET_SETTLEMENT_DETAIL_PAGE'),
        ['settlement/account/RefreshPage']: getPageFun('settleAccountPage', settleAccountPage, 'SET_SETTLEMENT_ACCOUNT_PAGE'),
        ['settlement/account/order/RefreshPage']: getPageFun('settleAccountOrderPage', settleAccountOrderPage, 'SET_SETTLEMENT_ACCOUNT_ORDER_PAGE'),
    }
};

