'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginByUsername = loginByUsername;
exports.logout = logout;
exports.getUserInfo = getUserInfo;

var _fetch = require('@/utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function loginByUsername(username, password) {
  var data = {
    username: username,
    password: password
  };
  return (0, _fetch2.default)({
    url: '/login/login',
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