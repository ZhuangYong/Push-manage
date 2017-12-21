import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function page(data) {
    return fetch({
        url: apiUrl.API_TYPE_LIST,
        method: 'post',
        data
    });
}
export function categoryMediaPage(data) {
    return fetch({
        url: apiUrl.API_TYPE_MEDIA_LIST,
        method: 'post',
        data
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_TYPE_SAVE,
        method: 'post',
        data
    });
}

export function updateRankInfo(data, extra) {
    return fetch({
        url: extra ? apiUrl.API_UPDATE_MEDIA_ACTOR_EXTRA : apiUrl.API_UPDATE_RANK_INFO,
        method: 'post',
        data
    });
}

export function updateTbActorOnMedia(data) {
    return fetch({
        url: apiUrl.API_UPDATE_TB_ACTOR_ON_MEDIA,
        method: 'post',
        data
    });
}
