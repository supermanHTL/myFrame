/**
 * 工具类
 */
module.exports = {
    resJson: function (err, res, json) {
        if (!err) {
            res.json({code: '9999', message: err});
        }
        else if (util.type(json) === 'undefined') {
            res.json({code: '0', message: '失败'});
        } else {
            var records = json.length;
            res.json({code: '1', message: '', records: records, rows: json});
        }
    },
    /*非登录跳转登录页
     *@param res object
     * */
    gotoLogin:function(req,res){
        /*if(this.browserType(req.headers['user-agent']).XJAPP){
         res.send("<script>ZoeJSBridge.showLoginView()</script>")
         }else{
         res.redirect("/login?return="+req.originalUrl);
         }*/
        delete req.session.sessionId;//登录前删除原有sessionId
        req.session.save();
        if(req.session.appCode==undefined || req.session.appCode=="HC_PUB_WX"){
            var url = escape(req.originalUrl);
            res.redirect("/login/login?return="+url);
        }else{
            res.send("<script>ZoeJSBridge.showLoginView()</script>")
        }
    },
    /**
     * 获取cookie
     * @param string
     * @returns {*|string}
     */
    getCookie:function(name,cookieString){
        var arr=cookieString.split('; ');
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');
            if(arr2[0]==name){
                return arr2[1];
            }
        }
        return '';
    },
    /**
     * 获取对象类型
     * @param obj
     * @returns {*|string}
     */
    typeOf: function (obj) {
        var toString = Object.prototype.toString;
        var type = {
            "undefined": "undefined",
            "number": "number",
            "boolean": "boolean",
            "string": "string",
            "[object Function]": "function",
            "[object RegExp]": "regexp",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object Error]": "error"
        };

        return type[typeof obj] || type[toString.call(obj)] || (obj ? "object" : "null");
    },
    /**
     * 判断对象是否为空
     * @param object
     * @returns {boolean}
     */
    isEmpty: function (object) {
        if (typeof object === "object" && !(object instanceof Array)){
            var hasProp = true;
            for (var prop in object){
                hasProp = false;
                break;
            }

        }
        if(typeof object === "object" && (object instanceof Array)){
            if(object.length > 0){
                hasProp = false;
            }
        }
        return hasProp;
        /*if (object == "" || this.typeOf(object) == "undefined" || this.typeOf(object) == "null") {
         return true;
         } else {
         return false;
         }*/
    },
    /**
     * 对像扩展
     * @param target 目标对象
     * @param source  源对象
     * @param flag    是否增开不
     * @returns {*}
     */
    extend: function (target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    /**
     * 判断元素是否在数组内
     * @param arr 数据
     * @param obj  查询的元素
     * @returns {boolean}
     */
    arrayContains: function (arr, obj) {
        var i = arr.length;
        obj = obj.toLowerCase();
        while (i--) {
            if (obj.indexOf(arr[i]) > -1) {
                return true;
            }
        }
        return false;
    },
    /*
     浏览器检测
     @param userAgent字符串
     */

    browserType:function(userAgent){
        var userAgent = userAgent.toLowerCase();
        var browser={
            version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
            safari: /webkit/.test(userAgent),
            opera: /opera/.test(userAgent),
            msie: /msie/.test(userAgent) && !/opera/.test( userAgent ),
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
            iPad:/ipad/.test(userAgent),
            iPhone:/iphone/.test(userAgent),
            android:/android/.test(userAgent) && /mobile/.test(userAgent),
            Pad:/android/.test(userAgent) && !/mobile/.test(userAgent),
            weixin:/micromessenger/.test(userAgent),
            androidweixin:/android/.test(userAgent) && /micromessenger/.test(userAgent),
            iOSweixin:(/ipad/.test(userAgent) || /iphone/.test(userAgent)) && /micromessenger/.test(userAgent),
            XJAPP:/xj_pub_adr/.test(userAgent) || /xj_pub_ios/.test(userAgent)
        };
        return browser;
    }
}
