/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: sales.js @author: walljack@163.com @date: 18-2-26 上午10:52 @version: 1.0
 */

import {
    page as salesPage, groupPage, stbUserPage, orderPage, statisticsIndex, statisticsDetail,
    salesDevicePage
} from '../../api/sales';
import {groupDevicePage, page as salesGroupPage, userPage as salesGroupUserPage} from '../../api/salesGroup';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

export default {
    state: {
        salesPage: getDefaultPageData(),
        groupPage: getDefaultPageData(),
        salesGroupPage: getDefaultPageData(),
        salesGroupUserPage: getDefaultPageData(),
        groupDevicePage: getDefaultPageData(),
        stbUserPage: getDefaultPageData(),
        orderPage: getDefaultPageData(),
        statisticsIndex: getDefaultPageData(),
        statisticsDetail: getDefaultPageData(),
        salesDevicePage: getDefaultPageData(),
    },
    mutations: {
        SET_SALES_PAGE: (state, data) => {
            state.salesPage = data;
        },
        SET_SALES_GROUP_PAGE: (state, data) => {
            state.groupPage = data;
        },
        SET_SALES_AND_GROUP_PAGE: (state, data) => {
            state.salesGroupPage = data;
        },
        SET_SALES_AND_GROUP_USER_PAGE: (state, data) => {
            state.salesGroupUserPage = data;
        },
        SET_SALES_AND_GROUP_DEVICE_PAGE: (state, data) => {
            state.groupDevicePage = data;
        },
        SET_SALES_STB_USER_PAGE: (state, data) => {
            state.stbUserPage = data;
        },
        SET_SALES_ORDER_PAGE: (state, data) => {
            state.orderPage = data;
        },
        SET_SALES_STATISTICS_PAGE: (state, data) => {
            state.statisticsIndex = data;
        },
        SET_SALES_STATISTICS_DETAIL_PAGE: (state, data) => {
            state.statisticsDetail = data;
        },
        SET_SALES_DEVICE_PAGE: (state, data) => {
            state.salesDevicePage = data;
        },
    },

    actions: {
        ['sales/RefreshPage']: getPageFun('salesPage', salesPage, 'SET_SALES_PAGE'),
        ['sales/group/RefreshPage']: getPageFun('groupPage', groupPage, 'SET_SALES_GROUP_PAGE'),
        ['salesGroup/RefreshPage']: getPageFun('salesGroupPage', salesGroupPage, 'SET_SALES_AND_GROUP_PAGE'),
        ['salesGroup/user/RefreshPage']: getPageFun('salesGroupUserPage', salesGroupUserPage, 'SET_SALES_AND_GROUP_USER_PAGE'),
        ['salesGroup/device/list/RefreshPage']: getPageFun('groupDevicePage', groupDevicePage, 'SET_SALES_AND_GROUP_DEVICE_PAGE'),
        ['sales/stbuser/RefreshPage']: getPageFun('stbUserPage', stbUserPage, 'SET_SALES_STB_USER_PAGE'),
        ['sales/order/RefreshPage']: getPageFun('orderPage', orderPage, 'SET_SALES_ORDER_PAGE'),
        ['sales/statistics/index/RefreshPage']: getPageFun('statisticsIndex', statisticsIndex, 'SET_SALES_STATISTICS_PAGE'),
        ['sales/statistics/detail/RefreshPage']: getPageFun('statisticsDetail', statisticsDetail, 'SET_SALES_STATISTICS_DETAIL_PAGE'),
        ['sales/device/RefreshPage']: getPageFun('salesDevicePage', salesDevicePage, 'SET_SALES_DEVICE_PAGE'),
    }
};

