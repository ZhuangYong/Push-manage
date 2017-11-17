'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _elementUi = require('element-ui');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = _axios2.default.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 });

service.interceptors.request.use(function (config) {
    if (_store2.default.getters.token) {
        config.headers['X-Token'] = (0, _auth.getToken)();
    }
    return config;
}, function (error) {
    console.log(error);
    _promise2.default.reject(error);
});

service.interceptors.response.use(function (response) {
    var res = response.data;
    var msg = res.msg,
        status = res.status;

    if (status !== 20000) {
        (0, _elementUi.Message)({
            message: msg,
            type: 'error',
            duration: 5 * 1000
        });

        return _promise2.default.reject('error');
    } else {
        return response.data;
    }
}, function (error) {
    console.log('err' + error);
    (0, _elementUi.Message)({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    });
    return _promise2.default.reject(error);
});

exports.default = service;
//# sourceMappingURL=fetch.js.map