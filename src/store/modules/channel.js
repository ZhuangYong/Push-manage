import {page as channelPage} from '../../api/channel';
import {page as productPage} from '../../api/product';
import {page as devicePage, pageDeviceUser} from '../../api/device';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        channelPage: Object.assign({}, defaultPageData),
        productPage: Object.assign({}, defaultPageData),
        devicePage: Object.assign({}, defaultPageData),
        deviceUserPage: Object.assign({}, defaultPageData)
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
    },
    actions: {
        ['channel/RefreshPage']: getPageFun('channelPage', channelPage, 'SET_ACTIVATE_DATA'),
        ['channel/product/RefreshPage']: getPageFun('productPage', productPage, 'SET_PRODUCT_DATA'),
        ['channel/device/RefreshPage']: getPageFun('devicePage', devicePage, 'SET_DEVICE_DATA'),
        ['channel/device/user/RefreshPage']: getPageFun('deviceUserPage', pageDeviceUser, 'SET_DEVICE_USER_DATA'),
    }
};
