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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loginByUsername(loginName, password) {
    password = (0, _md2.default)(password);
    var data = {
        loginName: loginName,
        password: password
    };
    return (0, _fetch2.default)({
        url: 'admin/login',
        method: 'post',
        data: data
    });
}

function logout() {
    return (0, _fetch2.default)({
        url: '/login/logout',
        method: 'post'
    });
}

function getUserInfo(token) {
    return (0, _fetch2.default)({
        url: '/user/info',
        method: 'get',
        params: { token: token }
    });
}
//# sourceMappingURL=login.js.map