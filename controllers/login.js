/** 2017-09-15 20:32:48
 *作者:黄添隆
 *功能:
 */
//登录页
var login = async (ctx, next) => {
    await ctx.render('login/login');
}

//登录结果页
var loginRes = async (ctx, next) => {
    var
        name = ctx.request.body.userName || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'htl' && password === '666') {
        await ctx.render('htl',{name:name})
    } else {
        await ctx.render('login/login-fail')
    }
}

//定义路由和方法（get or post），以及路由对应的方法
module.exports = {
    'GET /login': login,
    'POST /signin': loginRes
}