const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./baseConfig');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const env = config.build[process.env.env_config + 'Env'];

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}
const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: config.build.assetsPublicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: resolveApp('favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
            chunksSortMode: 'dependency'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'echarts',
            minChunks(module) {
                const context = module.context;
                return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'xlsx',
            minChunks(module) {
                const context = module.context;
                return context && (context.indexOf('xlsx') >= 0);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../static'),
        //     to: config.build.assetsSubDirectory,
        //     ignore: ['.*']
        // }])
    ]
});

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

