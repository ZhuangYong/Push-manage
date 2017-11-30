import {stbUserList} from '../../api/userManage';

export default {
    state: {
        page: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
    },
    mutations: {
        SET_STBUSER_LIST_DATA: (state, data) => {
            state.page = data;
        }
    },
    actions: {
        ['stbUser/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.page.currentPage,
                pageSize: state.page.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                stbUserList(param).then(response => {
                    console.log(response);
                    console.log('----------------');
                    commit('SET_STBUSER_LIST_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
