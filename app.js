/**
 * 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
 * @type {*|exports|module.exports}
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var config = require('./app/config/config');
var bodyParser = require('body-parser');
var ejs =require('ejs');
var log4js= require("./app/common/logger");
// var utility = require("./app/common/utility");
var URL = require("url");
var filePath = require('./app/config/config-path');

var webpack = require('webpack');
/*
* webpack-dev-middleware插件 + express服务 来实现热更新
* */
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./build/webpack.config.js');
var compiler = webpack(WebpackConfig);

/**
 * 加载路由控制
 */
var routes = require('./app/routes');
/**
 * 创建项目实例
 */
var app = express();

//webpack-dev-middleware配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: WebpackConfig.output.publicPath,
}));


// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());
/**
 * 定义EJS模板引擎和模板文件位置
 * 注册html模板引擎 将模版页后缀换成.html
 * 将模板引擎换成html
 *  view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * 定义日志和输出级别
 */
app.use(logger('dev'));
log4js.configure();
app.use(log4js.useLog());

/**
 * 定义数据解析器
 * limit：发送数据限制大小，wxl修改，测试用
 */
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ limit:'10mb',extended: false }));

/**
 * 定义cookie解析器
 */
app.use(cookieParser());

/**
 * 定义session
 */
app.use(session({
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new redisStore(config.sessionOptions),
  secret: 'publicHospSession',
  resave: true,
  saveUninitialized: true
}));

/**
 * 定义静态文件目录
 */
app.use(express.static(path.join(__dirname, 'public'),{maxAge:86400000}));


/**
 * 拦截器，将session的通用值传到ejs页面
 *浏览器header，文件路径等等
 * 同时设置缓存
 */
app.use(function(req, res, next){
  var maxAge = 86400,
      referer = null,
      expires = new Date();
  expires.setTime(expires.getTime() + maxAge * 1000);
  try {
    referer = URL.parse(req.headers.referer.toLowerCase())
  } catch (e) {

  }
  // res.locals.token = req.session.token;
  // res.locals.appCode = req.session.appCode;
  // res.locals.userInfo = req.cookies.userInfo;
  // res.locals.filePath = filePath;
  // res.locals.skinColor = req.session.skinColor;
  // res.locals.web = (app.get('env') === 'development');
  // res.locals.headers = {
  //   headers: req.headers,
  //   referer: referer,//来源url
  //   url: req.url,
  //   pathName: req._parsedUrl.pathname.toLowerCase()//页面路径，不带参数
  // }
  next();
});
/**
 * 匹配路径和路由
 */
routes.route(app);

/**
 * 生产环境，500错误处理
 * production error handler
 * no stacktraces leaked to user
 */
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
/**
 * 404错误处理
 * catch 404 and forward to error handler
 * js文件写空
 */
app.get("*",function(req, res, next) {
  if(path.extname(path.basename(req._parsedUrl.pathname)) === ".js"){
    res.send("")
    res.end()
  }else{
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404');
  }
});
module.exports = app;
