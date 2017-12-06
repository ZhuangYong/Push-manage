import {
    groupList, orderList, stbUserActivateRecord, stbUserList, stbUserLogin, stbUserMessage, stbUserOrder, stbUserUser,
    stbUserUserSound
} from '../../api/userManage';

export default {
    state: {
        stbUserPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserLoginData: {},
        stbUserUserPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserOrderPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserUserSoundPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserActivateRecordPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserMessagePage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        orderPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        groupPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
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
        SET_ORDER_DATA: (state, data) => {
            state.orderPage = data;
        },
        SET_GROUP_DATA: (state, data) => {
            state.groupPage = data;
        }
    },
    actions: {
        ['stbUser/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserPage.currentPage,
                pageSize: state.stbUserPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserList(param).then(response => {
                    commit('SET_STBUSER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/login']({commit}, id) {

            return new Promise((resolve, reject) => {
                stbUserLogin(id).then(response => {
                    console.log(response);
                    commit('SET_STBUSER_LOGIN_DATA', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/user/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserUserPage.currentPage,
                pageSize: state.stbUserUserPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserUser(param).then(response => {
                    commit('SET_STBUSER_USER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/order/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserOrderPage.currentPage,
                pageSize: state.stbUserOrderPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserOrder(param).then(response => {
                    commit('SET_STBUSER_ORDER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/userSound/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserUserSoundPage.currentPage,
                pageSize: state.stbUserUserSoundPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserUserSound(param).then(response => {
                    commit('SET_STBUSER_USER_SOUND_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/activateRecord/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserActivateRecordPage.currentPage,
                pageSize: state.stbUserActivateRecordPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserActivateRecord(param).then(response => {
                    commit('SET_STBUSER_ACTIVATE_RECORD_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/message/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserMessagePage.currentPage,
                pageSize: state.stbUserMessagePage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserMessage(param).then(response => {
                    commit('SET_STBUSER_MESSAGE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['order/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.orderPage.currentPage,
                pageSize: state.orderPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                orderList(param).then(response => {
                    commit('SET_ORDER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['group/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.groupPage.currentPage,
                pageSize: state.groupPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                groupList(param).then(response => {
                    commit('SET_GROUP_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
