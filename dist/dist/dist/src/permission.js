'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

require('nprogress/nprogress.css');

var _auth = require('@/utils/auth');

var _elementUi = require('element-ui');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true;
  if (!permissionRoles) return true;
  return roles.some(function (role) {
    return permissionRoles.indexOf(role) >= 0;
  });
}

var whiteList = ['/login', '/authredirect'];
_router2.default.beforeEach(function (to, from, next) {
  _nprogress2.default.start();
  if ((0, _auth.getToken)()) {
    if (to.path === '/login') {
      next({ path: '/' });
      _nprogress2.default.done();
    } else {
      if (_store2.default.getters.roles.length === 0) {
        _store2.default.dispatch('GetUserInfo').then(function (res) {
          var roles = res.data.role;
          _store2.default.dispatch('GenerateRoutes', { roles: roles }).then(function () {
            _router2.default.addRoutes(_store2.default.getters.addRouters);
            next((0, _extends3.default)({}, to));
          });
        }).catch(function () {
          _store2.default.dispatch('FedLogOut').then(function () {
            _elementUi.Message.error('验证失败,请重新登录');
            next({ path: '/login' });
          });
        });
      } else {
        if (hasPermission(_store2.default.getters.roles, to.meta.role)) {
          next();
        } else {
          next({ path: '/401', query: { noGoBack: true } });
          _nprogress2.default.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      _nprogress2.default.done();
    }
  }
});

_router2.default.afterEach(function () {
  _nprogress2.default.done();
});
//# sourceMappingURL=permission.js.map