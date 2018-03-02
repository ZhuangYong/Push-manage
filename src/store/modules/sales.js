/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: sales.js @author: walljack@163.com @date: 18-2-26 上午10:52 @version: 1.0
 */

import {page as salesPage, groupPage, stbUserPage, orderPage} from '../../api/sales';
import {page as salesGroupPage, userPage as salesGroupUserPage} from '../../api/salesGroup';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        salesPage: defaultPageData,
        groupPage: defaultPageData,
        salesGroupPage: defaultPageData,
        salesGroupUserPage: defaultPageData,
        stbUserPage: defaultPageData,
        orderPage: defaultPageData,
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
        SET_SALES_STB_USER_PAGE: (state, data) => {
            state.stbUserPage = data;
        },
        SET_SALES_ORDER_PAGE: (state, data) => {
            state.orderPage = data;
        },
    },

    actions: {
        ['sales/RefreshPage']: getPageFun('salesPage', salesPage, 'SET_SALES_PAGE'),
        ['sales/group/RefreshPage']: getPageFun('groupPage', groupPage, 'SET_SALES_GROUP_PAGE'),
        ['salesGroup/RefreshPage']: getPageFun('salesGroupPage', salesGroupPage, 'SET_SALES_AND_GROUP_PAGE'),
        ['salesGroup/user/RefreshPage']: getPageFun('salesGroupUserPage', salesGroupUserPage, 'SET_SALES_AND_GROUP_USER_PAGE'),
        ['sales/stbuser/RefreshPage']: getPageFun('stbUserPage', stbUserPage, 'SET_SALES_STB_USER_PAGE'),
        ['sales/order/RefreshPage']: getPageFun('orderPage', orderPage, 'SET_SALES_ORDER_PAGE'),
    }
};

