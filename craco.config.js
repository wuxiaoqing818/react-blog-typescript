


//less
const CracoLessPlugin = require('craco-less');

// 别名
const path = require("path")
const resolve = dir => path.resolve(__dirname, dir)

//清楚console.log
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,  //必须为1版本  不然启动打包报错  或者高版本删除此项
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ]
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