import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {//列表
    return fetch({
        url: apiUrl.API_LEIKE_LIST,
        method: 'post',
        data
    });
}

export function updatePic() { //更新图片
    return fetch({
        url: apiUrl.API_LEIKE_UPDATE_PIC,
        method: 'post'
    });
}

export function updateRank() { //更新榜单
    return fetch({
        url: apiUrl.API_LEIKE_UPDATERANK,
        method: 'post'
    });
}

export function updateRecommend() { //更新推荐数据
    return fetch({
        url: apiUrl.API_LEIKE_UPDATERECOMMEND,
        method: 'post'
    });
}

export function updateClass() { //更新分类
    return fetch({
        url: apiUrl.API_LEIKE_UPDATE_CLASS,
        method: 'post'
    });
}

export function save(data) { //保存
    return fetch({
        url: apiUrl.API_LEIKE_SAVE,
        method: 'post',
        data
    });
}
