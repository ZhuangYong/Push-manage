/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: payment.js @author: walljack@163.com @date: 18-3-8 上午11:13 @version: 1.0
 */

import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {payMentPage} from "../../api/payment";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        payMentPage: defaultPageData,
    },
    mutations: {
        SET_PAYMENT_PAGE: (state, data) => {
            state.payMentPage = data;
        },
    },

    actions: {
        ['payment/RefreshPage']: getPageFun('payMentPage', payMentPage, 'SET_PAYMENT_PAGE'),
    }
};

