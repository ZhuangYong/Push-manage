import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {//列表
    return fetch({
        url: apiUrl.API_LEIKE_LIST,
        method: 'post',
        data
    });
}

export function updatePic(data) { //更新图片
    return fetch({
        url: apiUrl.API_LEIKE_UPDATE_PIC,
        method: 'post',
        data
    });
}

export function updateRank(data) { //更新榜单
    return fetch({
        url: apiUrl.API_LEIKE_UPDATERANK,
        method: 'post',
        data
    });
}

export function updateRecommend(data) { //更新推荐数据
    return fetch({
        url: apiUrl.API_LEIKE_UPDATERECOMMEND,
        method: 'post',
        data
    });
}

export function updateClass(data) { //更新分类
    return fetch({
        url: apiUrl.API_LEIKE_UPDATE_CLASS,
        method: 'post',
        data
    });
}

export function save(data) { //保存
    return fetch({
        url: apiUrl.API_LEIKE_SAVE,
        method: 'post',
        data
    });
}
