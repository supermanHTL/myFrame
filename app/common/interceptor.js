// var logger =require("./logger").logger('interceptor');
// var ignoreOAuth = require('../config/config-ignore-oauth');
var config = require("../config/config");
// var utility = require("./utility");
var interceptor={
    /**
     * 请求拦截
     * @param req
     * @param res
     * @param next
     */
    requestInterceptor : function(req, res, next){
        var url = req._parsedUrl.pathname;
        if (req.headers.token !== undefined && req.headers.token !== "") { //原生
            req.session.token = req.headers.token;
            req.session.sessionId = req.headers.token;
            req.session.appCode = req.headers.appCode?req.headers.appCode:req.headers.appcode; //可能会被浏览器转小写
            console.log(req.session.appCode);
            req.session.save();
        } else if(req.body.token != "" && req.body.token != undefined){
            req.session.token = req.body.token;
            req.session.openID = req.body.openID;
        } else if(req.query.token != "" && req.query.token != undefined){ //微信浏览器
            req.session.token = req.query.token;
            req.session.sessionId = req.query.token;
            req.session.appCode = req.query.appCode?req.query.appCode:req.query.appcode; //可能会被浏览器转小写
            console.log(req.session.appCode);
            req.session.openID = req.query.openID;
            req.session.save();
        }
        /*if(req.query.appCode!=''&&req.query.appCode != undefined){
         req.session.appCode = req.query.appCode;
         }*/
        //req.session.appCode = '';
        if(req.session.appCode === undefined || req.session.appCode === ''){
            //if(config.environment.commonEnv.indexOf("ijhealth")!=-1){
            //   req.session.appCode ="AJ_PUB_WX";
            //} else{
            req.session.appCode ="HC_PUB_WX";
            // req.session.appCode ="HC_PUB_IOS";   //默认为健康城市ios端
            req.session.save();
            //}
        }
        /*从url取出皮肤标识（skinColor字段），存入session中*/
        if(req.query.skinColor != undefined){
            req.session.skinColor = req.query.skinColor;
            req.session.save();
        }
        /*从url取出支付方式标识（payType字段，z表示支付宝），存入session中*/
        if(req.query.payType != undefined){
            req.session.payType = req.query.payType;
            req.session.save();
        }

        /*从url取出支付方式标识（zoneCode字段），存入session中*/
        if(req.query.zoneCode != undefined){
            req.session.zoneCode = req.query.zoneCode;
            req.session.save();
        }
        console.log("取得的sessionId："+req.session.sessionId);
        console.log("取得的appCode："+req.session.appCode);
        console.log("取得的skinColor："+req.session.skinColor);
        console.log("取得的payType："+req.session.payType);
        console.log("取得的zoneCode："+req.session.zoneCode);

        // if (utility.arrayContains(ignoreOAuth.path, url)) {
        //     if (req.session.sessionId === "" || req.session.sessionId === undefined) {
        //         utility.gotoLogin(req, res);
        //     }else{
        //         next();
        //     }
        // } else {
        //     next();
        // }
        next();
    }
};
module.exports = interceptor;