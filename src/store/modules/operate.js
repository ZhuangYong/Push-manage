import {page as categoryPage, categoryMediaPage} from '../../api/category';
import {groupPage, groupActorPage, groupMediaPage} from '../../api/group';
import {searchPage} from '../../api/search';
import {feedbackPage} from '../../api/feedback';
import {getPageFun, getDefaultPageData} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        categoryPage: defaultPageData,
        categoryMediaPage: defaultPageData,
        groupPage: defaultPageData,
        groupActorPage: defaultPageData,
        groupMediaPage: defaultPageData,
        searchPage: defaultPageData,
        feedbackPage: defaultPageData
    },
    mutations: {
        SET_CATEGORY_DATA: (state, data) => {
            state.categoryPage = data;
        },
        SET_CATEGORY_MEDIA_DATA: (state, data) => {
            state.categroyMediaPage = data;
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
    },
    actions: {
        ['operate/category/RefreshPage']: getPageFun('categoryPage', categoryPage, 'SET_CATEGORY_DATA'),
        ['operate/category/media/RefreshPage']: getPageFun('categoryMediaPage', categoryMediaPage, 'SET_CATEGORY_MEDIA_DATA'),
        ['operate/group/RefreshPage']: getPageFun('groupPage', groupPage, 'SET_GROUP_DATA'),
        ['operate/group/actor/RefreshPage']: getPageFun('groupActorPage', groupActorPage, 'SET_GROUP_ACTOR_DATA'),
        ['operate/group/media/RefreshPage']: getPageFun('groupMediaPage', groupMediaPage, 'SET_GROUP_MEDIA_DATA'),
        ['operate/search/RefreshPage']: getPageFun('searchPage', searchPage, 'SET_SEARCH_DATA'),
        ['operate/feedback/RefreshPage']: getPageFun('feedbackPage', feedbackPage, 'SET_FEEDBACK_DATA'),
    }
};

