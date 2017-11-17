'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _login = require('../../api/login');

var _auth = require('../../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: (0, _auth.getToken)(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: function SET_CODE(state, code) {
      state.code = code;
    },
    SET_TOKEN: function SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_INTRODUCTION: function SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction;
    },
    SET_SETTING: function SET_SETTING(state, setting) {
      state.setting = setting;
    },
    SET_STATUS: function SET_STATUS(state, status) {
      state.status = status;
    },
    SET_NAME: function SET_NAME(state, name) {
      state.name = name;
    },
    SET_AVATAR: function SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    SET_ROLES: function SET_ROLES(state, roles) {
      state.roles = roles;
    }
  },

  actions: {
    LoginByUsername: function LoginByUsername(_ref, userInfo) {
      var commit = _ref.commit;

      var username = userInfo.username.trim();
      return new _promise2.default(function (resolve, reject) {
        (0, _login.loginByUsername)(username, userInfo.password).then(function (response) {
          var data = response.data;
          (0, _auth.setToken)(response.data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      });
    },
    GetUserInfo: function GetUserInfo(_ref2) {
      var commit = _ref2.commit,
          state = _ref2.state;

      return new _promise2.default(function (resolve, reject) {
        (0, _login.getUserInfo)(state.token).then(function (response) {
          if (!response.data) {
            reject('error');
          }
          var data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    },
    LogOut: function LogOut(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;

      return new _promise2.default(function (resolve, reject) {
        (0, _login.logout)(state.token).then(function () {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          (0, _auth.removeToken)();
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      });
    },
    FedLogOut: function FedLogOut(_ref4) {
      var commit = _ref4.commit;

      return new _promise2.default(function (resolve) {
        commit('SET_TOKEN', '');
        (0, _auth.removeToken)();
        resolve();
      });
    },
    ChangeRole: function ChangeRole(_ref5, role) {
      var commit = _ref5.commit;

      return new _promise2.default(function (resolve) {
        commit('SET_TOKEN', role);
        (0, _auth.setToken)(role);
        (0, _login.getUserInfo)(role).then(function (response) {
          var data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve();
        });
      });
    }
  }
};

exports.default = user;
//# sourceMappingURL=user.js.map