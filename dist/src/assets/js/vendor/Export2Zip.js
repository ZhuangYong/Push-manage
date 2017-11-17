'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.export_txt_to_zip = export_txt_to_zip;

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('script-loader!file-saver');
function export_txt_to_zip(th, jsonData, txtName, zipName) {
    var zip = new _jszip2.default();
    var txt_name = txtName || '文本';
    var zip_name = zipName || '压缩包';
    var data = jsonData;
    var txtData = th + '\r\n';
    data.forEach(function (row) {
        var tempStr = '';
        tempStr = row.toString();
        txtData += tempStr + '\r\n';
    });
    zip.file(txt_name + '.txt', txtData);
    zip.generateAsync({ type: "blob" }).then(function (blob) {
        saveAs(blob, zip_name + '.zip');
    }, function (err) {
        alert('导出失败');
    });
}
//# sourceMappingURL=Export2Zip.js.map