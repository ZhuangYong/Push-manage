/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: third.js @author: walljack@163.com @date: 18-3-15 上午10:45 @version: 1.0
 */

import {
    page as thirdApiPage, pageUser as thirdAppIdPage, pageUserChild as pageUserChildPage,
    pageUserApi as pageUserApiPage, pageOrder
} from '../../api/third';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

export default {
    state: {
        thirdApiPage: getDefaultPageData(),
        thirdAppIdPage: getDefaultPageData(),
        pageUserChildPage: getDefaultPageData(),
        pageUserApiPage: getDefaultPageData(),
        pageOrder: getDefaultPageData(),
    },
    mutations: {
        SET_THIRD_API_PAGE: (state, data) => {
            state.thirdApiPage = data;
        },
        SET_THIRD_APP_ID_PAGE: (state, data) => {
            state.thirdAppIdPage = data;
        },
        SET_THIRD_APP_ID_CHILD_PAGE: (state, data) => {
            state.pageUserChildPage = data;
        },
        SET_THIRD_API_CHILD_PAGE: (state, data) => {
            state.pageUserApiPage = data;
        },
        SET_THIRD_ORDER_PAGE: (state, data) => {
            state.pageOrder = data;
        },
    },

    actions: {
        ['third/api/RefreshPage']: getPageFun('thirdApiPage', thirdApiPage, 'SET_THIRD_API_PAGE'),
        ['third/api/child/RefreshPage']: getPageFun('pageUserApiPage', pageUserApiPage, 'SET_THIRD_API_CHILD_PAGE'),
        ['third/app/id/RefreshPage']: getPageFun('thirdAppIdPage', thirdAppIdPage, 'SET_THIRD_APP_ID_PAGE'),
        ['third/app/id/child/RefreshPage']: getPageFun('pageUserChildPage', pageUserChildPage, 'SET_THIRD_APP_ID_CHILD_PAGE'),
        ['third/order/RefreshPage']: getPageFun('pageOrder', pageOrder, 'SET_THIRD_ORDER_PAGE'),
    }
};

