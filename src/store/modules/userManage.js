import {stbUserList} from '../../api/userManage';

export default {
    state: {
        stbUserPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        stbUserList: {
            data: []
        }
    },
    mutations: {
        SET_STBUSER_DATA: (state, data) => {
            state.stbUserPage = data;
        },
        SET_STBUSER_LIST: (state, data) => {
            state.stbUserList = data;
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
        ['stbUser/list']({commit}) {
            return new Promise((resolve, reject) => {
                stbUserList().then(response => {
                    commit('SET_STBUSER_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
