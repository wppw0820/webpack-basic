// 入口文件
// 运用node中的Commonjs规范
// const a = require('./js/a.js')
import a from './js/a'
// 引入样式 必须配合loader 否则解析不了
import './css/index.css'
import './css/a.css' 
import './less/index.less'
import './sass/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
console.log(a)
