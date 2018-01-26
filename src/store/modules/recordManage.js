import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {soundList, userList} from "../../api/recordManage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        soundList: defaultPageData,
        userList: defaultPageData
    },
    mutations: {
        SET_SOUND_LIST: (state, data) => {
            state.soundList = data;
        },
        SET_SOUND_USER_LIST: (state, data) => {
            state.userList = {...defaultPageData, ...data};
        }
    },
    actions: {
        ['soundList/RefreshPage']: getPageFun('soundList', soundList, 'SET_SOUND_LIST'),
        ['soundList/userList/RefreshPage']: getPageFun('userList', userList, 'SET_SOUND_USER_LIST'),
    }
};
