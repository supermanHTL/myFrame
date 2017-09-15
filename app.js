/** 2017-09-15 14:18:54
 *作者:黄添隆
 *功能:项目入口文件
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const path = require('path');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

const static = require('koa-static');
const views = require('koa-views');

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public';
const ejs =  require('ejs');

//打开浏览器
var c = require('child_process');

// 加载ejs模板引擎,设置view文件夹下为路由加载页，将.ejs后缀改成.html
app.use(views(path.join(__dirname, './views'), {
    map : {html:'ejs'}
}))


/*
 * __dirname 表示当前文件夹的目录
 * */
//设置静态文件路径
app.use(static(
    path.join( __dirname,  staticPath)
))

//引入自定义路由遍历文件
const mapRouter = require(__dirname + '/mid/router');
app.use(mapRouter(app))  //启用该路由文件，并且把app对象传进去（用来启用bodyParser（））


// 在端口8080监听:
app.listen(8080);

//node模块打开指定目录
c.exec('start http://localhost:8080/login');
console.log('app started at port 8080...');

