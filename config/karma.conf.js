const webpackConfig = require('./webpack.test.conf');

module.exports = function (config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
        reporters: ['spec', 'coverage'],
        files: ['../test/unit/index.js'],
        preprocessors: {
            '../test/unit/index.js': ['webpack', 'sourcemap']
        },

        webpackMiddleware: {
            noInfo: true
        },
        // 不显示 `webpack` 打包日志信息
        webpackServer: {
            noInfo: true
        },
        webpack: webpackConfig,
        coverageReporter: {
            dir: '../coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}
