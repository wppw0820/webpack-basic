// 入口文件
// 运用node中的Commonjs规范
// const a = require('./js/a.js')
/* es6的export和import是统一的导入导出规范
  导出两种形式:
  1，export 成员变量或者函数 eg:export let num = 10; export function fn(){} 
  2,export default{属性：属性值}
  导入四种形式:
  1,import * as 别名 from 模块路径 此时*代表导入的是所有导出成员，全部挂载到module这个模块对象中，访问时通过别名.属性
  2,import {成员1，成员2，...} from 模块路径 此时是按需导入,导入的是第一种导出形式 
  3,import 变量名 from 模块路径 此时只会去找第二种导出形式 否则undefined
  4，直接导入 import 模块路径 此时在当前模块是无法访问任何导出的成员，只是另一模块再修饰或者操作此模块
*/
import { obj } from './js/a'
// 引入样式 必须配合loader 否则解析不了
import './css/index.css'
import './css/a.css'
import './less/index.less'
import './sass/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import '@babel/polyfill'
console.log(obj)
console.log('----------------')

// 使用babel解析高级语法
/* setTimeout((function () {
  console.log('普通函数,一秒钟执行了')
  console.dir(this) // undefined
}).bind(this), 1000)

setTimeout(() => {
  console.log('箭头函数，一秒钟执行了')
  console.dir(this) // undefined

}, 1000)
 */
class Person {
  constructor(name) {
    this.name = name
  }
}
let p = new Person("wp")
console.log(p)
class Dog {
  name = '大黄' // 更高级语法 需要配合 @babel/plugin-proposal-class-properties 插件
  static color = 'yellow'
}
let d = new Dog()
console.log(d.name) // 大黄
console.log(Dog.color) // 静态成员直接挂在Dog类中

// 书写generator语法
function *fn() { 
  yield 1
  yield 2
  return 3
 }
 let f = fn()
console.log(f.next())
console.log(f.next())
console.log(f.next())
console.log(f.next())

// es7 includes方法 babel默认是不会转换的
// js是一门动态语言，在代码执行时可以随时为对象添加新的方法和属性，babel在看到对象调用方法时时不会进行转换的,如果是低版本浏览器根本无法识别
let str = '123'
console.log(str.includes('2'))

