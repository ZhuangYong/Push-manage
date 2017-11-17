'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginByUsername = loginByUsername;
exports.logout = logout;
exports.getUserInfo = getUserInfo;

var _fetch = require('../utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _apiUrl = require('./apiUrl');

var _apiUrl2 = _interopRequireDefault(_apiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loginByUsername(loginName, password) {
    password = (0, _md2.default)(password);
    var data = {
        loginName: loginName,
        password: password
    };
    return (0, _fetch2.default)({
        url: _apiUrl2.default.API_LOGIN,
        method: 'post',
        data: data
    });
}

function logout() {
    return (0, _fetch2.default)({
        url: _apiUrl2.default.API_LOGOUT,
        method: 'post'
    });
}

function getUserInfo() {
    return (0, _fetch2.default)({
        url: _apiUrl2.default.API_GET_USER_INFO,
        method: 'post',
        params: {}
    });
}
//# sourceMappingURL=login.js.map