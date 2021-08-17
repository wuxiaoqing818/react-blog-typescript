//less
const CracoLessPlugin = require('craco-less');

// 别名
const path = require("path")
const resolve = dir => path.resolve(__dirname, dir)

//清楚console.log
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin')


module.exports = {

  plugins: [
    //less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A'
            },
            javascriptEnabled: true,
          },
        },
      },
    },





  ],
  //别名
  webpack: {
    alias: {
      '@': resolve('src'),
      '@components': resolve('./src/components'),
      '@assets': resolve('src/assets'),
      '@pages': resolve('src/pages'),
      '@services': resolve('src/services'),
      '@typings': resolve('src/typings')

    },
    // extensions: [".tsx", ".ts", ".jsx", ".js"]
    plugins: [
      // new TerserPlugin({
      //   sourceMap: process.env.NODE_ENV == 'development' ? true : false, // Must be set to true if using source-maps in production
      //   parallel: true,
      //   terserOptions: {
      //     ecma: undefined,
      //     warnings: false,
      //     parse: {},
      //     compress: {
      //       drop_console: process.env.NODE_ENV === "production", // 生产环境下移除控制台所有的内容
      //       drop_debugger: false, // 移除断点
      //       pure_funcs:
      //         process.env.NODE_ENV === "production" ? ["console.log"] : "", // 生产环境下移除console
      //     },
      //   },
   
      // }),
      //打包时候开启
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: process.env.NODE_ENV == 'development' ? true : false,  //必须为1版本  不然启动打包报错  或者高版本删除此项
            drop_debugger: process.env.NODE_ENV == 'development' ? false : true,
            drop_console: process.env.NODE_ENV == 'development' ? false : true,
          },
        },
        sourceMap: process.env.NODE_ENV == 'development' ? true : false,
        parallel: true,
      }),
    ],
  },
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

};