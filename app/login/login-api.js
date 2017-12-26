
var apiHelper = require("../common/api-helper");
module.exports = {

    /**
     * 登陆
     * @param parameter 参数 json字符串非空
     * {"loginName": "非空","password": "非空","scope":{"appCode": "非空","clientId": "2222","orgCode": "dyyy","validDays":30}}
     * @param callBack(err,ret) 两个参数
     *err 非空时为出错
     * ret返回值
     * {"code":"0","data":"token"}
     */
    login: function (parameter, callBack,req, res) {
        apiHelper.getPlatformApi("/oauth/login", parameter, callBack, req ,res);
    },

}