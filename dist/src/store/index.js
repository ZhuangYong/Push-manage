'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _app = require('./modules/app');

var _app2 = _interopRequireDefault(_app);

var _user = require('./modules/user');

var _user2 = _interopRequireDefault(_user);

var _permission = require('./modules/permission');

var _permission2 = _interopRequireDefault(_permission);

var _getters = require('./getters');

var _getters2 = _interopRequireDefault(_getters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = new _vuex2.default.Store({
    modules: {
        app: _app2.default,
        user: _user2.default,
        permission: _permission2.default
    },
    getters: _getters2.default
});

exports.default = store;
//# sourceMappingURL=index.js.map