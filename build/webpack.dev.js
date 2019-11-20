const path = require('path')
const webpack = require('webpack')
// 引入merge合并配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 2,webpack配置
module.exports = merge(baseConfig, {
  // 模式 默认是production 生产环境
  mode: 'development',
  // 启动监视模式 打包之后处于等待状态（阻塞状态） 随时监听代码的修改自动再次打包 当然最好的方式是webpack-dev-server 
  // watch:true,
  // webpack-dev-server 静态服务器配置  webpack会在开发阶段提供一个根目录下的静态服务器,默认编译的bundle.js在根目录 (内存中,看不到)
  devServer: { //js更改自动刷新，html更改不会自动刷新
    host: '0.0.0.0',
    port: 3000,
    hot: true, // 热模块更新默认不开启，开启后意味着每次更新只会编译打补丁形式 更新的那些部分减少开销
    // compress:true, // 服务端资源压缩，http服务技术 开启后返回资源压缩成很小的内存
    contentBase: resolve('public'),// 也可以在package.json中 dev中 --contentBase public 配置入口主页的路径 默认是在根目录 / 静态资源托管到public下，如果http请求直接全路径能找到就直接返回资源，不能找到就去托管找然后返回，当然也可以用html插件更好

  },
  plugins: [
    // webpack内置定义环境变量插件可以在任何地方使用 目的是区分是dev 还是pro环境
    new webpack.DefinePlugin({
      IS_ENV: 'true'
    })
  ],
  devtool: 'cheap-module-eval-source-map' // 源码映射,准确定位代码某行 开发环境推荐使用这一个 生产环境建议不适用source-map
})