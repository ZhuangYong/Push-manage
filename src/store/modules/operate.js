import {page as categoryPage, categoryMediaPage} from '../../api/category';
import {recommendPage, recommendMediaPage} from '../../api/recommend';
import {rankPage, rankMediaPage} from '../../api/rank';
import {groupPage, groupActorPage, groupMediaPage} from '../../api/group';
import {searchPage} from '../../api/search';
import {feedbackPage, feedbackClassifyPage, feedbackReply} from '../../api/feedback';
import {actorPage} from '../../api/actor';
import {mediaPage} from '../../api/media';
import {getPageFun, getDefaultPageData} from "../../utils/fun";
import {adminTypeGroupList} from "../../api/typeGroupManage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        recommendPage: defaultPageData,
        recommendMediaPage: defaultPageData,
        rankPage: defaultPageData,
        rankMediaPage: defaultPageData,
        categoryPage: defaultPageData,
        categoryMediaPage: defaultPageData,
        groupPage: defaultPageData,
        groupActorPage: defaultPageData,
        groupMediaPage: defaultPageData,
        searchPage: defaultPageData,
        feedbackPage: defaultPageData,
        feedbackClassifyPage: defaultPageData,
        feedbackClassifyPageReply: defaultPageData,
        actorPage: defaultPageData,
        mediaPage: defaultPageData,
        adminTypeGroupList: defaultPageData
    },
    mutations: {
        SET_CATEGORY_DATA: (state, data) => {
            state.categoryPage = data;
        },
        SET_CATEGORY_MEDIA_DATA: (state, data) => {
            state.categoryMediaPage = data;
        },
        SET_RECOMMEND_DATA: (state, data) => {

            data.data = data.data.map(item => {
                item.rankId = parseInt(item.rankId, 10);
                return item;
            });
            state.recommendPage = data;
        },
        SET_RECOMMEND_MEDIA_DATA: (state, data) => {
            state.recommendMediaPage = data;
        },
        SET_RANK_DATA: (state, data) => {

            data.data = data.data.map(item => {
                item.rankId = parseInt(item.rankId, 10);
                return item;
            });
            state.rankPage = data;
        },
        SET_RANK_MEDIA_DATA: (state, data) => {
            state.rankMediaPage = data;
        },
        SET_GROUP_DATA: (state, data) => {
            state.groupPage = data;
        },
        SET_GROUP_ACTOR_DATA: (state, data) => {
            state.groupActorPage = data;
        },
        SET_GROUP_MEDIA_DATA: (state, data) => {
            state.groupMediaPage = data;
        },
        SET_SEARCH_DATA: (state, data) => {
            state.searchPage = data;
        },
        SET_FEEDBACK_DATA: (state, data) => {
            state.feedbackPage = data;
        },
        SET_FEEDBACK_CLASSIFY_DATA: (state, data) => {
            state.feedbackClassifyPage = data;
        },
        SET_FEEDBACK_CLASSIFY_REPLY: (state, data) => {
            state.feedbackClassifyPageReply = data;
        },
        SET_ACTOR_DATA: (state, data) => {

            data.data = data.data.map(item => {
                item.actorNo = parseInt(item.actorNo, 10);
                return item;
            });
            state.actorPage = data;
        },
        SET_MEDIA_DATA: (state, data) => {

            data.data = data.data.map(item => {
                item.serialNo = parseInt(item.serialNo, 10);
                return item;
            });
            state.mediaPage = data;
        },
        SET_ADMIN_TYPE_GROUP_LIST: (state, data) => {
            state.adminTypeGroupList = data;
        },
    },
    actions: {
        ['operate/category/RefreshPage']: getPageFun('categoryPage', categoryPage, 'SET_CATEGORY_DATA'),
        ['operate/category/media/RefreshPage']: getPageFun('categoryMediaPage', categoryMediaPage, 'SET_CATEGORY_MEDIA_DATA'),
        ['operate/recommend/RefreshPage']: getPageFun('recommendPage', recommendPage, 'SET_RECOMMEND_DATA'),
        ['operate/recommend/media/RefreshPage']: getPageFun('recommendMediaPage', recommendMediaPage, 'SET_RECOMMEND_MEDIA_DATA'),
        ['operate/rank/RefreshPage']: getPageFun('rankPage', rankPage, 'SET_RANK_DATA'),
        ['operate/rank/media/RefreshPage']: getPageFun('rankMediaPage', rankMediaPage, 'SET_RANK_MEDIA_DATA'),
        ['operate/group/RefreshPage']: getPageFun('groupPage', groupPage, 'SET_GROUP_DATA'),
        ['operate/group/actor/RefreshPage']: getPageFun('groupActorPage', groupActorPage, 'SET_GROUP_ACTOR_DATA'),
        ['operate/group/media/RefreshPage']: getPageFun('groupMediaPage', groupMediaPage, 'SET_GROUP_MEDIA_DATA'),
        ['operate/search/RefreshPage']: getPageFun('searchPage', searchPage, 'SET_SEARCH_DATA'),
        ['operate/feedback/RefreshPage']: getPageFun('feedbackPage', feedbackPage, 'SET_FEEDBACK_DATA'),
        ['operate/feedback/classify/RefreshPage']: getPageFun('feedbackClassifyPage', feedbackClassifyPage, 'SET_FEEDBACK_CLASSIFY_DATA'),
        ['operate/actor/RefreshPage']: getPageFun('actorPage', actorPage, 'SET_ACTOR_DATA'),
        ['operate/media/RefreshPage']: getPageFun('mediaPage', mediaPage, 'SET_MEDIA_DATA'),
        ['operate/feedback/reply/RefreshPage']: getPageFun('feedbackClassifyPageReply', feedbackReply, 'SET_FEEDBACK_CLASSIFY_REPLY'),
        ['adminTypeGroupList/RefreshPage']: getPageFun('adminTypeGroupList', adminTypeGroupList, 'SET_ADMIN_TYPE_GROUP_LIST')
    }
};

