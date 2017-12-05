import {groupList, orderList, stbUserList, stbUserUser} from '../../api/userManage';

export default {
    state: {
        stbUserPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserUserPage: {
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
        SET_STBUSER_USER_DATA: (state, data) => {
            state.stbUserUserPage = data;
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
                    console.log(response);
                    commit('SET_STBUSER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['stbUser/user/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.stbUserPage.currentPage,
                pageSize: state.stbUserPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserUser(param).then(response => {
                    console.log(response);
                    commit('SET_STBUSER_USER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
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
                    console.log(response);
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
                    console.log(response);
                    commit('SET_GROUP_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
