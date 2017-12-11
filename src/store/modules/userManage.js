import {
    groupList, groupUser, orderList, stbUserActivateRecord, stbUserList, stbUserLogin, stbUserMessage, stbUserOrder,
    stbUserUser,
    stbUserUserSound
} from '../../api/userManage';
import {deviceDeviceList} from "../../api/device";
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        stbUserPage: defaultPageData,
        stbUserLoginData: {},
        stbUserUserPage: defaultPageData,
        stbUserOrderPage: defaultPageData,
        stbUserUserSoundPage: defaultPageData,
        stbUserActivateRecordPage: defaultPageData,
        stbUserMessagePage: defaultPageData,
        deviceDeviceList: {},
        orderPage: defaultPageData,
        groupPage: defaultPageData,
        groupUserPage: defaultPageData
    },
    mutations: {
        SET_STBUSER_DATA: (state, data) => {
            state.stbUserPage = data;
        },
        SET_STBUSER_LOGIN_DATA: (state, data) => {
            state.stbUserLoginData = data;
        },
        SET_STBUSER_USER_DATA: (state, data) => {
            state.stbUserUserPage = data;
        },
        SET_STBUSER_ORDER_DATA: (state, data) => {
            state.stbUserOrderPage = data;
        },
        SET_STBUSER_USER_SOUND_DATA: (state, data) => {
            state.stbUserUserSoundPage = data;
        },
        SET_STBUSER_ACTIVATE_RECORD_DATA: (state, data) => {
            state.stbUserActivateRecordPage = data;
        },
        SET_STBUSER_MESSAGE_DATA: (state, data) => {
            state.stbUserMessagePage = data;
        },
        SET_DEVICE_DEVICE_LIST: (state, data) => {
            state.deviceDeviceList = data;
        },
        SET_ORDER_DATA: (state, data) => {
            state.orderPage = data;
        },
        SET_GROUP_DATA: (state, data) => {
            state.groupPage = data;
        },
        SET_GROUP_USER_DATA: (state, data) => {
            state.groupUserPage = data;
        }
    },
    actions: {
        ['stbUser/RefreshPage']: getPageFun('stbUserPage', stbUserList, 'SET_STBUSER_DATA'),
        ['stbUser/login']({commit}, id) {

            return new Promise((resolve, reject) => {
                stbUserLogin(id).then(response => {
                    commit('SET_STBUSER_LOGIN_DATA', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/user/RefreshPage']: getPageFun('stbUserUserPage', stbUserUser, 'SET_STBUSER_USER_DATA'),
        ['stbUser/order/RefreshPage']: getPageFun('stbUserOrderPage', stbUserOrder, 'SET_STBUSER_ORDER_DATA'),
        ['stbUser/userSound/RefreshPage']: getPageFun('stbUserUserSoundPage', stbUserUserSound, 'SET_STBUSER_USER_SOUND_DATA'),
        ['stbUser/activateRecord/RefreshPage']: getPageFun('stbUserActivateRecordPage', stbUserActivateRecord, 'SET_STBUSER_ACTIVATE_RECORD_DATA'),
        ['stbUser/message/RefreshPage']: getPageFun('stbUserMessagePage', stbUserMessage, 'SET_STBUSER_MESSAGE_DATA'),
        ['device/deviceList']({commit}) {

            return new Promise((resolve, reject) => {
                deviceDeviceList().then(response => {
                    commit('SET_DEVICE_DEVICE_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['order/RefreshPage']: getPageFun('orderPage', orderList, 'SET_ORDER_DATA'),
        ['group/RefreshPage']: getPageFun('groupPage', groupList, 'SET_GROUP_DATA'),
        ['group/user/RefreshPage']: getPageFun('groupUserPage', groupUser, 'SET_GROUP_USER_DATA')
    }
};
