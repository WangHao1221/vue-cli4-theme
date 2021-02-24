/* eslint-disable */
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEV = ['development'].includes(process.env.NODE_ENV);
const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: !IS_PROD,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require('os').cpus().length > 1,
    pwa: {},
    css: {
        extract: IS_PROD,
        sourceMap: false,
    },
    configureWebpack: (config) => {
        const config2 = config;
        const plugins = [];

        if (IS_DEV) {
            // 关闭host check，方便使用ngrok之类的内网转发工具
            config2.devServer = {
                disableHostCheck: true,
            };
        }
        if (IS_PROD) {
            // 去除多余无效的css
            plugins.push(
                new PurgecssPlugin({
                    paths: glob.sync([resolve('./**/*.vue')]),
                    extractors: [{
                        extractor: class Extractor {
                            static extract(content) {
                                const validSection = content.replace(
                                    /<style([\s\S]*?)<\/style>+/gim,
                                    '',
                                );
                                return (
                                    validSection.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
                                );
                            }
                        },
                        extensions: ['html', 'vue'],
                    }],
                    whitelist: ['html', 'body'],
                    whitelistPatterns: [
                        /el-.*/,
                        /-(leave|enter|appear)(|-(to|from|active))$/,
                        /^(?!cursor-move).+-move$/,
                        /^router-link(|-exact)-active$/,
                    ],
                    whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
                }),
            );
            // 开启 gzip 压缩
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            );
        }
        config2.plugins = [...config2.plugins, ...plugins];
    },
    chainWebpack: (config) => {
        const config2 = config;
        // 修复HMR
        config2.resolve.symlinks(true);
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config2.plugin('html').tap((args) => {
            const args2 = args;
            // 修复 Lazy loading routes Error
            args2[0].chunksSortMode = 'none';
            return args2;
        });
        // 添加别名
        config2.resolve.alias
            .set('@', resolve('src'))
            .set('@/assets', resolve('src/assets'))
            .set('@/components', resolve('src/components'))
            .set('@/plugins', resolve('src/plugins'))
            .set('@/views', resolve('src/views'))
            .set('@/store', resolve('src/store'))
            .set('@/api', resolve('src/api'));
        if (IS_PROD) {
            // 压缩图片
            config2.module
                .rule('images')
                .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                    mozjpeg: { progressive: true, quality: 65 },
                    optipng: { enabled: false },
                    pngquant: { quality: [0.65, 0.90], speed: 4 },
                    gifsicle: { interlaced: false },
                });

            // 打包分析
            config2.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
                analyzerMode: 'static',
            }]);
            // 分包处理
            config2.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    viewDesign: {
                        name: 'chunk-viewDesign',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?view-design(.*)/,
                    },
                    echarts: {
                        name: 'chunk-echarts', // split elementUI into a single package
                        priority: 11, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?echarts(.*)/,
                    },
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial', // only package third parties that are initially dependent
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
            config2.optimization.runtimeChunk('single');
        }
    },
    devServer: {
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //     warnings: false,
        //     errors: true
        // },
        // open: false, // 是否打开浏览器
        // host: "localhost",
        port: '8888',
        // https: false,
        // hotOnly: false, // 热更新
        proxy: {
            '/api': {
                target: 'https://sfmpdev.qhse.cn', // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    },
};