const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 引入merge合并配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
// 2,webpack配置
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // webpack内置定义环境变量插件可以在任何地方使用
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devtool: 'cheap-module-source-map' // 源码映射,准确定位代码某行 开发环境推荐使用这一个 生产环境建议不适用source-map
})