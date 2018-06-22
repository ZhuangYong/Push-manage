import {
    groupDeviceCanChooseList,
    groupList, groupUser, orderList, stbUserActivateRecord, stbUserList, stbUserLogin, stbUserLoginPage, stbUserMessage, stbUserOrder,
    stbUserUser,
    stbUserUserSound,
    deviceBootInfoPage
} from '../../api/userManage';
import {deviceDeviceList} from "../../api/device";
import {albumPage} from '../../api/album';
import {userListPage, userListBind, userListTagPage} from '../../api/userList';
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {getCommentList, getReplyList} from "../../api/comment";
import {userTagPage} from "../../api/userTag";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        stbUserPage: defaultPageData,
        stbUserLoginPage: defaultPageData,
        stbUserLoginData: {},
        stbUserUserPage: defaultPageData,
        deviceBootInfoPage: defaultPageData,
        stbUserOrderPage: defaultPageData,
        stbUserUserSoundPage: defaultPageData,
        stbUserActivateRecordPage: defaultPageData,
        stbUserMessagePage: defaultPageData,
        deviceDeviceList: {},
        orderPage: defaultPageData,
        groupPage: defaultPageData,
        groupUserPage: defaultPageData,
        albumPage: defaultPageData,
        userListPage: defaultPageData,
        groupDeviceCanChooseList: defaultPageData,
        userBindPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: [],
            result: {}
        },
        commentPage: defaultPageData,
        replyPage: defaultPageData,
        userTagPage: defaultPageData,
        userListTagPage: defaultPageData
    },
    mutations: {
        SET_USER_LIST_TAG_DATA: (state, data) => {
            state.userListTagPage = data;
        },
        SET_USER_TAG_DATA: (state, data) => {
            state.userTagPage = data;
        },
        SET_COMMENT_DATA: (state, data) => {
            state.commentPage = data;
        },
        SET_REPLY_DATA: (state, data) => {
            state.replyPage = data;
        },
        SET_STBUSER_DATA: (state, data) => {
            state.stbUserPage = data;
        },
        SET_STBUSER_LOGIN_DATA: (state, data) => {
            state.stbUserLoginData = data;
        },
        SET_STBUSER_LOGIN_PAGE_DATA: (state, data) => {
            state.stbUserLoginPage = data;
        },
        SET_STBUSER_USER_DATA: (state, data) => {
            state.stbUserUserPage = data;
        },
        SET_DEVICE_BOOT_INFO_DATA: (state, data) => {
            state.deviceBootInfoPage = data;
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
        },
        SET_ALBUM_LIST: (state, data) => {
            state.albumPage = data;
        },
        SET_USER_LIST: (state, data) => {
            state.userListPage = data;
        },
        SET_USER_CAN_CHOOSE_LIST: (state, data) => {
            state.groupDeviceCanChooseList = data;
        },
        SET_USER_BIND: (state, data) => {
            state.userBindPage = data;
        }
    },
    actions: {
        ['user/userTag/RefreshPage']: getPageFun('userListTagPage', userListTagPage, 'SET_USER_LIST_TAG_DATA'),
        ['userTag/RefreshPage']: getPageFun('userTagPage', userTagPage, 'SET_USER_TAG_DATA'),
        ['comment/RefreshPage']: getPageFun('commentPage', getCommentList, 'SET_COMMENT_DATA'),
        ['reply/RefreshPage']: getPageFun('replyPage', getReplyList, 'SET_REPLY_DATA'),
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
        ['stbUser/user/page/RefreshPage']: getPageFun('stbUserLoginPage', stbUserLoginPage, 'SET_STBUSER_LOGIN_PAGE_DATA'),
        ['stbUser/user/device/boot/RefreshPage']: getPageFun('deviceBootInfoPage', deviceBootInfoPage, 'SET_DEVICE_BOOT_INFO_DATA'),
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
        ['group/user/RefreshPage']: getPageFun('groupUserPage', groupUser, 'SET_GROUP_USER_DATA'),
        //相册
        ['album/RefreshPage']: getPageFun('albumPage', albumPage, 'SET_ALBUM_LIST'),
        //用户列表
        ['userList/RefreshPage']: getPageFun('userListPage', userListPage, 'SET_USER_LIST'),
        ['userList/device/canChoose/RefreshPage']: getPageFun('groupDeviceCanChooseList', groupDeviceCanChooseList, 'SET_USER_CAN_CHOOSE_LIST'),
        //绑定设备模块
        ['userBind/RefreshPage']: getPageFun('userBindPage', userListBind, 'SET_USER_BIND')
    }
};
