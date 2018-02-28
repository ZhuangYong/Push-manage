import {page as pageList, epgList} from '../../api/pageBuild';
import {list as screenList, templateList, page as screenPage} from '../../api/screen';
import {page as publishList, getPublishChannel, getPublishChangeChannelList} from '../../api/publish';
import {page as loadList} from '../../api/load';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        epgPage: defaultPageData,
        screenList: {
            data: []
        },
        templateList: [],
        screenPage: defaultPageData,
        publishPage: {
            data: []
        },
        epgList: {
            data: []
        },
        publishChannelList: [],
        publishChangeChannelList: [],
        loadList: defaultPageData
    },
    mutations: {
        SET_PUBLISH_DATA: (state, data) => {
            state.publishPage = data;
        },
        SET_EPG_DATA: (state, data) => {
            state.epgPage = data;
        },
        SET_EPG_EPG_LIST: (state, data) => {
            state.epgList = data;
        },
        SET_SCREEN_TEMPLATE_LIST: (state, data) => {
            state.templateList = data;
        },
        SET_SCREEN_LIST: (state, data) => {
            state.screenList = data;
        },
        SET_SCREEN_PAGE: (state, data) => {
            state.screenPage = data;
        },
        SET_PUBLISH_CHANNEL: (state, data) => {
            state.publishChannelList = data;
        },
        SET_PUBLISH_CHANGE_CHANNEL: (state, data) => {
            state.publishChangeChannelList = data;
        },
        SET_LOAD_LIST: (state, data) => {
            state.loadList = data;
        },
    },
    actions: {
        ['buildPage/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.epgPage.currentPage,
                pageSize: state.epgPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                pageList(param).then(response => {
                    commit('SET_EPG_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['buildPage/epgList']({commit}) {
            return new Promise((resolve, reject) => {
                epgList().then(response => {
                    commit('SET_EPG_EPG_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['screen/list']({commit}) {
            return new Promise((resolve, reject) => {
                screenList().then(response => {
                    commit('SET_SCREEN_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['screen/template/list']({commit}, param) {
            return new Promise((resolve, reject) => {
                templateList(param).then(response => {
                    commit('SET_SCREEN_TEMPLATE_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['screen/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.screenPage.currentPage,
                pageSize: state.screenPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                screenPage(param).then(response => {
                    commit('SET_SCREEN_PAGE', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['publish/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.epgPage.currentPage,
                pageSize: state.epgPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                publishList(param).then(response => {
                    commit('SET_PUBLISH_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['publish/chanelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getPublishChannel().then(response => {
                    commit('SET_PUBLISH_CHANNEL', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['publish/changeChanelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getPublishChangeChannelList().then(response => {
                    commit('SET_PUBLISH_CHANGE_CHANNEL', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['epg/load/RefreshPage']: getPageFun('loadList', loadList, 'SET_LOAD_LIST'),
    }
};
