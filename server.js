// 使用webpack-dev-middleware中间件自定义一个express服务器 自动编译 必须要用html-webpack-plugin插件否则无法正确输出到express服务器的根目录
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js') // 引入webpack配置
// 构建express服务器
const app = express()
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { // 类似于express的静态资源托管作用 app.use(express.static(资源路径)) 把最终的编译结果dist存放在根目录并托管
    publicPath: '/'
  }
))
app.listen(3000, function () {
  console.log('http://localhost:3000')

})