/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturer.js @author: walljack@163.com @date: 18-2-27 下午4:14 @version: 1.0
 */

import {page as manufacturerPage, channelPage} from '../../api/manufacturer';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        manufacturerPage: defaultPageData,
        channelPage: defaultPageData
    },
    mutations: {
        SET_MANUFACTURER_PAGE: (state, data) => {
            state.manufacturerPage = data;
        },
        SET_MANUFACTURER_CHANNEL_PAGE: (state, data) => {
            state.channelPage = data;
        },
    },

    actions: {
        ['manufacturer/RefreshPage']: getPageFun('manufacturerPage', manufacturerPage, 'SET_MANUFACTURER_PAGE'),
        ['manufacturer/channel/RefreshPage']: getPageFun('channelPage', channelPage, 'SET_MANUFACTURER_CHANNEL_PAGE'),
    }
};

