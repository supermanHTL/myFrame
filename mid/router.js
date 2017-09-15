/** 2017-09-15 14:18:17
 *作者:黄添隆
 *功能:遍历所有的路由
 */

const fs = require('fs');
const files = fs.readdirSync(__dirname + '/../controllers');

/**
 *
 方法说明: 将路由文件夹里的js文件所暴露出的对象，处理成
 是get方法，还是post方法的所对应的路由操作
 *
 @method 方法名: mapRouter
 *
 @param 参数说明:
    item: js文件暴露出来的对象
    router: router: koa-router的实例化
 *
 @return 返回值说明:
 */
function mapRouter(item,router) {
    for(let url in item) {
        if(url.startsWith('GET')) {
            router.get(url.substring(4), item[url]);
        }else if(url.startsWith('POST')) {
            router.post(url.substring(5),item[url]);
        }
    }
}

/**
 *
 方法说明: 将指定的根文件夹（dir），作为路由文件夹
 *
 @method 方法名: addMaping
 *
 @param 参数说明:
    router: koa-router的实例化
    dir: 要设置成路由文件夹的文件夹名称
 *
 @return 返回值说明:
 */
function addMaping(router,dir) {
    const files_dir = fs.readdirSync(__dirname + '/../' + dir);  //根目录的路由文件夹
    const files_js = files_dir.filter((item) => {
        return item.endsWith('.js');
    });
    for(let fileName of files_js) {
        const maping = require(__dirname + '/../controllers/' + fileName);
        mapRouter(maping,router);
    }
}


module.exports = function(app,dir) {
    const router = require('koa-router')(); // 注意require('koa-router')返回的是函数:
    const bodyParser = require('koa-bodyparser'); //用来解决post请求中req.body不能解析的问题
    const routerDir = dir || 'controllers';   //没有传指定路由文件夹（必须为根目录的文件夹），默认为controller文件
    addMaping(router,routerDir);
    app.use(bodyParser());   //启用bodyParser
    return router.routes();
}


