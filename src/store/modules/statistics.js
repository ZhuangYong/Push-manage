import {page, getStatChanList, getStatActive} from '../../api/statistics';

export default {
    state: {
        statData: {
            all: [],
            day: [],
            month: []
        },
        statChanList: [],
        statActivate: [],

    },
    mutations: {
        SET_STATISTICS_DATA: (state, data) => {
            state.statData.all = [];
            state.statData.day = [];
            state.statData.month = [];

            (state.statData.all).push(data.all);
            (state.statData.day).push(data.day);
            (state.statData.month).push(data.month);
        },
        SET_STATISTICS_CHANNEL_LIST: (state, data) => {
            state.statChanList = data;
        },
        SET_STATISTICS_ACTIVATE: (state, data) => {
            state.statActivate = data;
        }
    },

    actions: {
        ['statistics/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    commit('SET_STATISTICS_DATA', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/channelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatChanList().then(response => {
                    commit('SET_STATISTICS_CHANNEL_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/activate']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatActive().then(response => {
                    commit('SET_STATISTICS_ACTIVATE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

