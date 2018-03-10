import {manufacturerChannelList, page as channelPage} from '../../api/channel';
import {page as productPage} from '../../api/product';
import {page as devicePage, pageDeviceUser} from '../../api/device';
import {page as groupPage, productPage as childProductPage} from '../../api/vipGroup';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

export default {
    state: {
        channelPage: getDefaultPageData(),
        productPage: getDefaultPageData(),
        devicePage: getDefaultPageData(),
        deviceUserPage: getDefaultPageData(),
        vipGroupPage: getDefaultPageData(), //产品分组
        vipGroupProductPage: getDefaultPageData(), //子产品
        manufacturerChannelList: getDefaultPageData(), //子产品
    },
    mutations: {
        SET_ACTIVATE_DATA: (state, data) => {
            state.channelPage = data;
        },
        SET_PRODUCT_DATA: (state, data) => {
            state.productPage = data;
        },
        SET_DEVICE_DATA: (state, data) => {
            state.devicePage = data;
        },
        SET_DEVICE_USER_DATA: (state, data) => {
            state.deviceUserPage = data;
        },
        SET_VIP_GROUP_DATA: (state, data) => {
            state.vipGroupPage = data;
        },
        SET_VIP_GROUP_PRODUCT_DATA: (state, data) => {
            state.vipGroupProductPage = data;
        },
        SET_MANUFACTURER_CHANNEL_LIST: (state, data) => {
            state.manufacturerChannelList = data;
        },
    },
    actions: {
        ['channel/RefreshPage']: getPageFun('channelPage', channelPage, 'SET_ACTIVATE_DATA'),
        ['channel/product/RefreshPage']: getPageFun('productPage', productPage, 'SET_PRODUCT_DATA'),
        ['channel/device/RefreshPage']: getPageFun('devicePage', devicePage, 'SET_DEVICE_DATA'),
        ['channel/device/user/RefreshPage']: getPageFun('deviceUserPage', pageDeviceUser, 'SET_DEVICE_USER_DATA'),
        ['channel/vipGroup/RefreshPage']: getPageFun('vipGroupPage', groupPage, 'SET_VIP_GROUP_DATA'),
        ['channel/vipGroup/product/RefreshPage']: getPageFun('vipGroupProductPage', childProductPage, 'SET_VIP_GROUP_PRODUCT_DATA'),
        ['channel/manufacturer/RefreshPage']: getPageFun('manufacturerChannelList', manufacturerChannelList, 'SET_MANUFACTURER_CHANNEL_LIST'),
    }
};
