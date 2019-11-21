
import './css/index.css'
import './css/a.css'
import './less/index.less'
import './sass/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import '@babel/polyfill'
import aa from './js/a'
// 引入jquery
// import $ from 'jquery'
$('body').append($('<a href="" class="a">我是jquery创建的a链接</a>'))
$('.a').css('color', '#fff')
console.log(window.$) //直接打印是undefined 说明并未挂在全局，webpack编译会把第三方模块放在一个完全的闭包函数当中，利用expose-loader 或者webpack内置的ProvidePlugin
console.log('我是index.js')
console.log(aa)
// 热更新局部刷新，不刷新整个网页，通过accept方法 监听指定的倒入模块，当模块更新时 回调函数触发
if (module.hot) {
  module.hot.accept('./js/a.js', function () {
    console.log('aa模块更新了')
  })

}
console.log(process.env.NODE_ENV)
