
var http = require('http');
var https = require('https');
var qs = require('qs');
var appConfig = require("../config/config");
var apiHostMapping = require("../config/api-host-mapping")
// var logger =require("./logger").logger('api-helper');
var utility = require("./utility");
var urlFun = require("url");
// var timehash = require("com.zoe.timehash").timehash;

var apiFun={
    /**
     *获取API
     * @param option
     * @param callBack
     */
    getApi : function(option,callBack,paramRes) {
        var contentType='application/x-www-form-urlencoded;charset=utf-8';
        if(!option.method || option.method == "GET"){
            contentType='application/x-www-form-urlencoded;';
        }
        var postData = qs.stringify(option.param) ||  qs.stringify({});
        var opt = {
            host: option.host,
            port: option.port || 80,
            method: option.method || 'GET',
            path: option.path,
            callBack: callBack || option.callBack || function () {
            },
            headers: {
                'Content-Type': contentType,
                'Content-Length': postData.length,
                'time-hash': this.timehash(),
                'token': option.sessionId,
                'commons-session-id': option.sessionId,
            },
            rejectUnauthorized:false
        }
        var port = (opt.port == 443 ? https : http);
        var data = '';
        var req = port.request(opt, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function (d) {
                var jsonData;
                try {
                    jsonData = JSON.parse(data);
                    jsonData.sessionId = option.sessionId;
                    opt.callBack("success",jsonData);
                }catch(e){
                    opt.callBack("error",{err:e});
                }
            });
            res.on('error', function (e) {
                logger.error("getApi:"+e.message);
                opt.callBack("error",{err:e.message});
            });
        });
        req.write(postData);
        req.end();
    },
    /**
     * 获取平台API
     * @param path api路径
     * @param parameter api参数
     * @param callBack 回调函数
     */
    getPlatformApi : function(path,parameter,callBack,req,res){
        var token = req.session.token == undefined ? this.getGuid() : req.session.token;
        // var sessionId = req.session.sessionId === undefined? this.getGuid(): req.session.sessionId;
        if(parameter === null){
            parameter = utility.extend(req.body, req.query);
        } else {
            if(utility.typeOf(parameter) === 'string'){
                try{
                    parameter = JSON.parse(parameter);
                }catch(e){
                    parameter = {parameter: parameter};
                }
            }
        }
        var apiHost = this.getApiHost(path,req);
        var option={
            host: apiHost.host,
            port: apiHost.port,
            method: 'POST',
            path: path,
            param: parameter,
            sessionId: token
        };
        console.log("时间戳:"+this.timehash()+",地址:"+req.url+",DATAURL:"+option.host+":"+option.port+option.path+"?"+decodeURIComponent(qs.stringify(option.param)));
        this.getApi(option, function(err,ret){
            if(err == "success"){
                if(((ret.code == "1050" || ret.code == "1501") && res != undefined) || ret.code == undefined){
                    utility.gotoLogin(req,res)
                }else{
                    callBack(null,ret);
                }
            }else if(err == "error"){
                if(res != undefined) res.render('404',{err:JSON.stringify(ret)})
            }
        });
    },
    getApiHost : function(path,req){
        var hostList = apiHostMapping;
        var host = appConfig.apiPlatformUrl.host;
        var port = appConfig.apiPlatformUrl.port;
        hostList.forEach(function(e){
            if(path.indexOf(e.ctrlUrl)==0){
                host = e.host;
                port = e.port;
                return {host:host,port:port};
            }
        });
        return {host:host,port:port};
    },

    getGuid : function(){
        var guid = "";
        for (var i = 1; i <= 32; i++){
            var n = Math.floor(Math.random()*16.0).toString(16);
            guid +=   n;
            if((i==8)||(i==12)||(i==16)||(i==20))
                guid += "-";
        }
        return guid;
    },

    timehash: function() {
        var base = 100000;
        var time = new Date().getTime();
        var n0 = Math.floor(time / 1024);
        var n1 = (n0 % base) * Math.floor(n0 / base);
        var n2 = time % 90 + 10;
        var n3 = n2 * base + n1 % base;
        var n4 = n3;
        while (n4 >= 100) n4 = n4 >> 1;

        return n3 * 100 + n4;
    }


}
module.exports = apiFun;