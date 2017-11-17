'use strict';

var utils = require('./utils');
var path = require('path');
var webpack = require('webpack');
var config = require('./baseConfig');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}
module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    devtool: '#cheap-source-map',
    cache: true,
    plugins: [new webpack.DefinePlugin({
        'process.env': config.dev.env
    }), new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        favicon: resolveApp('favicon.ico'),
        inject: true,
        path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }), new FriendlyErrorsPlugin(), new OpenBrowserPlugin({
        url: 'http://wx.j-make.cn'
    })]
});
//# sourceMappingURL=webpack.dev.conf.js.map