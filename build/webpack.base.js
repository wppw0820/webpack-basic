// webpack 是基于node写的所以遵循commonjs规范 webpack配置默认是webpack.config.js也可以自定义 不过要npx webpack --config '自定义的名字'
// 或者在package.json的scripts脚本中配置 配合 npm run xxx来执行 
// 1,引入path模块处理路径问题
const path = require('path')
// 引入html插件
const htmlWebpackPlugin = require('html-webpack-plugin') // 这是一个构造函数 使用时需要new
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 这个插件是每次build之前先清除之前的防止意外情况
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 2,webpack配置
module.exports = {
  // 四大核心模块 入口entry，出口output，加载loader，插件plugins
  // 配置入口文件，webpack4.0以后 可以0配置打包，默认入口文件是src下面的index 可以手动配置修改

  /*
  webpack会在开发阶段提供一个根目录下的静态服务器,默认编译的bundle.js在根目录 (内存中,看不到)
  完成开发环境和生产环境的 服务地址配置, 在开发阶段项目运行起来时的静态服务器在根目录，通过webpack-dev-server实时编译的bundle.js是在根目录，
  此时index.html引入的编译bundle.js只能通过绝对路径'/'访问，而在生产环境时,通过手动npm run build打包之后的 index.html和bundle.js在同一个dist文件中 
  此时应该用相对路径'./'
  */
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // entry: './src/main.js', // 单入口
  // 多入口配置(多入口就有多出口)
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  // 配置出口 要求路径必须绝对路径 默认生成dist文件 下面的main.js
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // 插件配置模块
  plugins: [
    new htmlWebpackPlugin({
      // 书写配置
			/* 作用：1，在开发时，根据模板在express项目根目录下生成html文件（类似于devServer生成的bundle.js）
              2, devServer时自动引入bundle.js
              3, 打包时会在dist中自动生成index.html
       */
      filename: 'index.html', // 名字一般起index.html，作用是在devServer时,根据template在根目录中生成 index.html模板（也是内存），这就解决了直接访问端口不能进入主页的情况
      template: './src/index.html', // 要提供的模板
      chunks: ['index'],
    }),
    new htmlWebpackPlugin({
      filename: 'other.html',
      template: './src/other.html',
      chunks: ['other'],
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: 'public', // 默认dist根目录
      }
    ], {
      ignore: [],
      copyUnmodified: true,
    }),
    new CleanWebpackPlugin(),
    // webpack内置插件
    new webpack.BannerPlugin('wppw所有'), // 添加打包之后的一些注解信息
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery',
    })
  ],
  // loader配置模块（加载器用来解决css,less,图片，字体 在入口文件不识别问题）
  module: {
    rules: [
      // webpack读取loader时，是从右到左读取，会将css文件先交给最右侧loader来处理
      // loader的执行顺序是从右到左的管道方式链式调用
      //css-loader：解析css文件 style-loader：将解析出来的结果 放到html中使其生效
      //1,css-loader配置
      {
        test: /\.css$/,//正则匹配什么类型文件,
        use: ['style-loader', 'css-loader'] //用什么来解析你匹配的文件
      },
      // 2，less-loader配置
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // 3，sass-loader配置
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // 可以使用url-loader 但是必须要下载file-loader，因为url-loader是基于file-loader的封装
      {
        test: /\.(jpg|jpeg|png|bmp|gif|woff|woff2|svg|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            // name属性就是设定打包后的图片路径，[name]保持原图片名字 [hash]生成hash唯一名字 [ext]图片类型, 默认打包之后图片名字会被唯一标识化[hash:6]限制6位hash值
            name: 'images/[name].[ext]',
            limit: 5 * 1024,
            // 也可以使用outputPath来指定图片打包存放目录
            // outputPath: 'images'
          },

        }
      },
      // html中img标签的图片处理
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader',
      },
      // babel 解析js的高级语法，使浏览器能够解析
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
      // 引入第三方库的expose-loader配置 注意：第三方库引入不会直接挂载到全局，webpack的闭包模块化不会自动处理
      {
        // expose-loader会把jquery挂在到全局window使每一模块都能访问jquery，但是向全局挂载东西并不友好可以用ProvidePlugin插件来自动import每个模块而并非挂载全局
        // test: require.resolve('jquery'),
        // use: {
        //   loader: 'expose-loader',
        //   options: '$'
        // }
      },
    ]
  },
}