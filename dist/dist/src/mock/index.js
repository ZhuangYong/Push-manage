'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

var _remoteSearch = require('./remoteSearch');

var _remoteSearch2 = _interopRequireDefault(_remoteSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mockjs2.default.setup({
  timeout: '350-600'
});

_mockjs2.default.mock(/\/login\/login/, 'post', _login2.default.loginByUsername);
_mockjs2.default.mock(/\/login\/logout/, 'post', _login2.default.logout);
_mockjs2.default.mock(/\/user\/info\.*/, 'get', _login2.default.getUserInfo);

_mockjs2.default.mock(/\/article\/list/, 'get', _article2.default.getList);
_mockjs2.default.mock(/\/article\/detail/, 'get', _article2.default.getArticle);
_mockjs2.default.mock(/\/article\/pv/, 'get', _article2.default.getPv);

_mockjs2.default.mock(/\/search\/user/, 'get', _remoteSearch2.default.searchUser);

exports.default = _mockjs2.default;
//# sourceMappingURL=index.js.map