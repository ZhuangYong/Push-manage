/**
 * Created by Zed on 2017/12/11.
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function soundDelete(data) { // 批量删除录音

    return fetch({
        url: apiUrl.API_SOUND_DELETE,
        method: 'post',
        data
    });
}

export function soundDisable(id) {//禁用录音模块(path: id)

    return fetch({
        url: apiUrl.API_SOUND_DISABLE + id,
        method: 'post'
    });
}

export function soundList(data) {//获取分页数据(path: id)

    return fetch({
        url: apiUrl.API_SOUND_LIST,
        method: 'post',
        data
    });
}

/**
 * 查看分享该录音的用户列表
 * @returns {*}
 */
export function userList(data) {
    return fetch({
        url: apiUrl.API_SOUND_USER,
        method: 'post',
        data
    });
}
