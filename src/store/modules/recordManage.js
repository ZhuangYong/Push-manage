import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {soundList} from "../../api/recordManage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        soundList: defaultPageData
    },
    mutations: {
        SET_SOUND_LIST: (state, data) => {
            state.soundList = data;
        }
    },
    actions: {
        ['soundList/RefreshPage']: getPageFun('soundList', soundList, 'SET_SOUND_LIST')
    }
};
