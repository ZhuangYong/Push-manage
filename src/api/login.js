import fetch from '../utils/fetch';
import md5 from 'md5';

export function loginByUsername(loginName, password) {
    password = md5(password);
    const data = {
        loginName,
        password
    };
    return fetch({
        url: 'admin/login',
        method: 'post',
        data
    });
}

export function logout() {
    return fetch({
        url: '/login/logout',
        method: 'post'
    });
}

export function getUserInfo(token) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params: {token}
    });
}

