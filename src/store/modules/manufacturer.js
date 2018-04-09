/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturer.js @author: walljack@163.com @date: 18-2-27 下午4:14 @version: 1.0
 */

import {page as manufacturerPage, channelPage, devicePage} from '../../api/manufacturer';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        manufacturerPage: getDefaultPageData(),
        channelPage: getDefaultPageData(),
        devicePage: getDefaultPageData()
    },
    mutations: {
        SET_MANUFACTURER_PAGE: (state, data) => {
            state.manufacturerPage = data;
        },
        SET_MANUFACTURER_CHANNEL_PAGE: (state, data) => {
            state.channelPage = data;
        },
        SET_MANUFACTURER_DEVICE_PAGE: (state, data) => {
            state.devicePage = data;
        },
    },

    actions: {
        ['manufacturer/RefreshPage']: getPageFun('manufacturerPage', manufacturerPage, 'SET_MANUFACTURER_PAGE'),
        ['manufacturer/channel/RefreshPage']: getPageFun('channelPage', channelPage, 'SET_MANUFACTURER_CHANNEL_PAGE'),
        ['manufacturer/device/RefreshPage']: getPageFun('devicePage', devicePage, 'SET_MANUFACTURER_DEVICE_PAGE'),
    }
};

