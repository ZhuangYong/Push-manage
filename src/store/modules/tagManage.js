import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {
    tagActorPage,
    tagChannelPage,
    tagMediaPage, tagOtherActorPage,
    tagOtherChannelPage,
    tagOtherMediaPage, tagOtherRankGroupPage,
    tagPage,
    tagRankGroupPage
} from "../../api/tagManage";

const defaultData = getDefaultPageData();
export default {
    state: {
        tagPageData: defaultData,
        tagChannelData: defaultData,
        tagOtherChannelData: defaultData,
        tagMediaPage: defaultData,
        tagOtherMediaPage: defaultData,
        tagRankGroupPage: defaultData,
        tagOtherRankGroupPage: defaultData,
        tagActorPage: defaultData,
        tagOtherActorPage: defaultData,
    },
    mutations: {
        SET_PAGE: (state, data) => {
            state.tagPageData = data;
        },
        SET_CHANNEL_PAGE: (state, data) => {
            state.tagChannelData = data;
        },
        SET_OTHER_CHANNEL_PAGE: (state, data) => {
            state.tagOtherChannelData = data;
        },
        SET_MEDIA_PAGE: (state, data) => {
            state.tagMediaPage = data;
        },
        SET_OTHER_MEDIA_PAGE: (state, data) => {
            state.tagOtherMediaPage = data;
        },
        SET_TYPE_GROUP_PAGE: (state, data) => {
            state.tagRankGroupPage = data;
        },
        SET_OTHER_TYPE_GROUP_PAGE: (state, data) => {
            state.tagOtherRankGroupPage = data;
        },
        SET_ACTOR_PAGE: (state, data) => {
            state.tagActorPage = data;
        },
        SET_OTHER_ACTOR_PAGE: (state, data) => {
            state.tagOtherActorPage = data;
        },
    },
    actions: {
        ['tag/RefreshPage']: getPageFun('tagPageData', tagPage, 'SET_PAGE'),
        ['tag/channel/RefreshPage']: getPageFun('tagChannelData', tagChannelPage, 'SET_CHANNEL_PAGE'),
        ['tag/otherChannel/RefreshPage']: getPageFun('tagOtherChannelData', tagOtherChannelPage, 'SET_OTHER_CHANNEL_PAGE'),
        ['tag/media/RefreshPage']: getPageFun('tagMediaPage', tagMediaPage, 'SET_MEDIA_PAGE'),
        ['tag/otherMedia/RefreshPage']: getPageFun('tagOtherMediaPage', tagOtherMediaPage, 'SET_OTHER_MEDIA_PAGE'),
        ['tag/typeGroup/RefreshPage']: getPageFun('tagRankGroupPage', tagRankGroupPage, 'SET_TYPE_GROUP_PAGE'),
        ['tag/otherTypeGroup/RefreshPage']: getPageFun('tagOtherRankGroupPage', tagOtherRankGroupPage, 'SET_OTHER_TYPE_GROUP_PAGE'),
        ['tag/actor/RefreshPage']: getPageFun('tagActorPage', tagActorPage, 'SET_ACTOR_PAGE'),
        ['tag/otherActor/RefreshPage']: getPageFun('tagOtherActorPage', tagOtherActorPage, 'SET_OTHER_ACTOR_PAGE'),
    }
};
