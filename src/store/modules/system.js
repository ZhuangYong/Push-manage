import {funPage, funChannelList, funPageList} from "../../api/function";

export default {
    state: {
        funManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        funChannelList: [],
        funpageList: []
    },

    mutations: {
        SET_FUNCTION_LIST: (state, funManage) => {
            state.funManage = funManage;
        },
        SET_FUNCTION_CHANNEL: (state, funChannelList) => {
            state.funChannelList = funChannelList;
        },
        SET_FUNCTION_PAGE: (state, funpageList) => {
            state.funpageList = funpageList;
        }
    },

    actions: {
        ['fun/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                funPage(param).then(response => {
                    commit('SET_FUNCTION_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['fun/chanelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                funChannelList().then(response => {
                    commit('SET_FUNCTION_PAGE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['fun/pageList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                funPageList().then(response => {
                    commit('SET_FUNCTION_PAGE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
