/**
 * Created by fu_haicheng on 2016/1/13.
 */
var app = require('express')();
var appConfig = require("./config");
var env= appConfig.environment.commonEnv;
switch(env){
    case "mall-dev":
        //通用商城--开发库
        var mallHost = "172.16.34.41";
        var mallPort = "9020";
        //用户
        var ranchHost = "172.16.34.41";
        var ranchPort = "9090";
        // 服务控制
        var ssctrlHost = "172.16.34.41";
        var ssctrlPort = '9011';
        //支付-积分-优惠券
        var puddingHost = "172.16.34.41";
        var puddingPort = "11010";
        var cfHost = "172.16.33.167";
        var cfPort = "8001";
        break;
    case "mall-test":
        //通用商城--预发布
        var mallHost = "172.16.34.43";
        var mallPort = "9020";
        //用户
        var ranchHost = "172.16.34.43";
        var ranchPort = "9090";
        // 服务控制
        var ssctrlHost = "172.16.34.43";
        var ssctrlPort = '9011';
        //支付-积分-优惠券
        var puddingHost = "172.16.34.43";
        var puddingPort = "11010";
        break;
    case "mall-formal":
        //通用商城--正式库
        var mallHost = "192.168.1.6";
        var mallPort = "9020";
        //用户
        var ranchHost = "192.168.1.6";
        var ranchPort = "9090";
        // 服务控制
        var ssctrlHost = "192.168.1.6";
        var ssctrlPort = '9011';
        //支付-积分-优惠券
        var puddingHost = "192.168.1.6";
        var puddingPort = "11010";
        break;
    case "mall-demo":     //演示环境
        var mallHost = "172.16.12.115";
        var mallPort = "11010";
        //用户
        var ranchHost = "172.16.12.115";
        var ranchPort = "11010";
        // 服务控制
        var ssctrlHost = "172.16.12.115";
        var ssctrlPort = '11010';
        //支付-积分-优惠券
        var puddingHost = "172.16.12.115";
        var puddingPort = "11010";
        break;
}

module.exports = [
    //商城
    {ctrlUrl:"/goodsmall/",host:mallHost,port:mallPort},
    {ctrlUrl:"/product/",host:mallHost,port:mallPort},
    //服务分成
    {ctrlUrl:"/service/",host:mallHost,port:mallPort},
    //用户信息
    {ctrlUrl:"/user/",host:ranchHost, port:ranchPort},
    {ctrlUrl:"/oauth/",host:ranchHost, port:ranchPort},
    //用户积分
    {ctrlUrl:"/user/surplus/",host:puddingHost, port:puddingPort},
    //字典(省市乡联动地址)
    {ctrlUrl:"/classify/",host:ranchHost, port:ranchPort},
    //订单
    {ctrlUrl:"/order/",host:ranchHost, port:ranchPort},
    // 订单快照
    {ctrlUrl:"/snapshot/",host:ranchHost, port:ranchPort},
    //物流
    {ctrlUrl:"/logistics/",host:ranchHost, port:ranchPort},
    //通用服务器端时间获取
    {ctrlUrl:"/commons/",host:ranchHost, port:ranchPort},
    //支付
    {ctrlUrl:"/pay/",host:puddingHost, port:puddingPort},
    {ctrlUrl:"/deposit/",host:puddingHost, port:puddingPort},
    //地址
    {ctrlUrl:"/address/",host:ranchHost, port:ranchPort},
    //商品评价
    {ctrlUrl:"/comment/",host:ranchHost, port:ranchPort},
    //我的服务列表(医生和用户)
    {ctrlUrl:"/ssctrl/",host:ssctrlHost, port:ssctrlPort},

]