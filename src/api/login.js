import fetch from '../utils/fetch';
import md5 from 'md5';
import apiUrl from "./apiUrl";

export function loginByUsername(loginName, password) {
    password = md5(password);
    const data = {
        loginName,
        password
    };
    return fetch({
        url: apiUrl.API_LOGIN,
        method: 'post',
        // headers: {
        //     validateCode: validateCode,
        //     validateCodeKey: validateCodeKey
        // },
        data
    });
}

export function logout() {
    return fetch({
        url: apiUrl.API_LOGOUT,
        method: 'post'
    });
}

export function getUserInfo() {
    return fetch({
        url: apiUrl.API_GET_USER_INFO,
        method: 'post',
        params: {}
    });
}

