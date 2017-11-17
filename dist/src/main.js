'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

require('element-ui/lib/theme-default/index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _filters = require('./utils/filters');

var filters = _interopRequireWildcard(_filters);

require('./assets/icons');

require('./errorLog');

require('./permission');

require('./mock');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_elementUi2.default);

(0, _keys2.default)(filters).forEach(function (key) {
    _vue2.default.filter(key, filters[key]);
});

_vue2.default.config.productionTip = false;

new _vue2.default({
    el: '#app',
    router: _router2.default,
    store: _store2.default,
    template: '<App/>',
    components: { App: _App2.default }
});
//# sourceMappingURL=main.js.map