import {getStatChanList} from '../../api/statistics';
import {page} from '../../api/actual';

export default {
    state: {
        statData: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        detail: [],
        statChanList: []

    },
    mutations: {
        SET_STATISTICS_DATA: (state, data) => {
            state.statData = data;
        },
        SET_STATISTICS_DETAIL: (state, data) => {
            state.detail = [];
            (state.detail).push(data);
        },
        SET_STATISTICS_CHANNEL_LIST: (state, data) => {
            state.statChanList = data;
        }
    },

    actions: {
        ['actual/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    commit('SET_STATISTICS_DATA', response);
                    commit('SET_STATISTICS_DETAIL', response.detail);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['actual/channelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatChanList().then(response => {
                    commit('SET_STATISTICS_CHANNEL_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

