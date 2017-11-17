'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.timeAgo = timeAgo;
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.nFormatter = nFormatter;
exports.html2Text = html2Text;
exports.toThousandslsFilter = toThousandslsFilter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pluralize(time, label) {
    if (time === 1) {
        return time + label;
    }
    return time + label + 's';
}

function timeAgo(time) {
    var between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour');
    } else {
        return pluralize(~~(between / 86400), ' day');
    }
}

function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }

    if ((time + '').length === 10) {
        time = +time * 1000;
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date = void 0;
    if ((typeof time === 'undefined' ? 'undefined' : (0, _typeof3.default)(time)) === 'object') {
        date = time;
    } else {
        date = new Date(parseInt(time, 0));
    }
    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
        var value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}

function formatTime(time, option) {
    time = +time * 1000;
    var d = new Date(time);
    var now = Date.now();

    var diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
    }
}

function nFormatter(num, digits) {
    var si = [{ value: 1E18, symbol: 'E' }, { value: 1E15, symbol: 'P' }, { value: 1E12, symbol: 'T' }, { value: 1E9, symbol: 'G' }, { value: 1E6, symbol: 'M' }, { value: 1E3, symbol: 'k' }];
    for (var i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
        }
    }
    return num.toString();
}

function html2Text(val) {
    var div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

function toThousandslsFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, function (m) {
        return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
    });
}
//# sourceMappingURL=filters.js.map