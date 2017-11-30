import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";


export function stbUserList(data) {//列表
    return fetch({
        url: apiUrl.API_STBUSER_LIST,
        method: 'post',
        data
    });
}
