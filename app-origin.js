/** 2017-09-15 14:17:17
 *作者:黄添隆
 *功能: 没有进行任何封装的app文件
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

/*用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，
 或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，
 还是koa提供的request对象，都不提供解析request的body的功能！*/
//所以用来解决post请求中req.body不能解析的问题
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());  //注册模块（位置要放在router注册前）
app.use(router.routes());   //注册模块

const fs = require('fs');
 // 先导入fs模块，然后用readdirSync列出文件
 // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
 const files = fs.readdirSync(__dirname + '/controllers');  //返回的是一个数组（controllers文件下所有文件名的数组）
 const files_js =  files.filter((item) => { //过滤出js文件
 return item.endsWith('.js');
 })


// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx,next) => {
//     console.log(`方法是：${ctx.request.method}`);
//     console.log(`url是：${ctx.request.url}`);
//     await next();
// })

/*
 * 不使用koa-router来实现路由的切换
 * */
// app.use(async (ctx, next) => {
//     if(ctx.request.url == '/cc') {
//         ctx.response.type = 'text/html';
//         ctx.response.body = '<h1>Hello,this is cc page !</h1>';
//     }else {
//         ctx.response.type = 'text/html';
//         ctx.response.body = '<h1>Hello, koa2!</h1>';
//     }
//
//     await next();  //才能执行下一个中间件（如下下面的router.get())
// });

/*
 *使用koa-router实现路由切换
 * */
// router.get('/htl:msg', async(ctx,next) => {
//     console.log(`路径的带的信息是：${ctx.params.msg}`);
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>this is htl page !</h1>';
// })


//通过遍历让constollers里面的js文件全部require到当前文件，并且router进行处理
for(let item of files_js) {
    const maping = require(__dirname + '/controllers/' + item);
    for(let url in maping) {
        if(url.startsWith('GET')) {
            router.get(url.substring(4),maping[url]);
        }else if(url.substring('POST')) {
            router.post(url.substring(5),maping[url]);
        }
    }
}

// 在端口8080监听:
app.listen(8080);
console.log('app started at port 8080...');

