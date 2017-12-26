
var express = require('express');
var router = express.Router();
var loginApi = require("./login-api");

// 登录
router.get('/login',function(req, res, next){
    res.render('login/login');
})

// 登录ajax
router.post('/putLogin',function(req, res, next){
    delete req.session.sessionId;
    req.session.save();
    var parameter = {
        uid: req.body.loginName,
        password: req.body.password,
        type: 1,
        appCode: 'HC_PUB_IOS'     //默认为ios平台登入
        // appCode: req.body.appCode     //默认为ios平台登入
    };
    loginApi.login(parameter, function(err,ret){
        req.session.sessionId = ret.sessionId;
        req.session.save();
        res.json(ret);
    },req,res)
})


module.exports = router;