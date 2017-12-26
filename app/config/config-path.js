
var app = require("express")();
var appConfig = require("./config");
var env= appConfig.environment.commonEnv;
var path;
switch(env){
    case "mall-dev":    //开发库
        path = {
            imgURL:'',//图片路径
            cssURL:'',//css路径
            uploadImg:'http://8098.commons.dev.zoenet.cn',
            uploadApi:"http://8098.commons.dev.zoenet.cn/commons/ctrl-http/upload",//上传接口
            imgHC: 'http://8098.hc.dev.zoenet.cn',   //健康城市的图片资源
            jsURL:'',//js路径
            appId:'wxb7b06cd95c35d3e4',//艾嘉支付的appid
            wxpayBackUrl:"http://mall.commons.dev.zoenet.cn",
            wxpayUrl:'http://ijwx.juyihui.net/zoe-ijhealth-mobile-wechat/getopenId',//艾嘉支付获取授权的地址
            HCH5Url: 'http://4000.hc.dev.zoenet.cn',    //健康城市H5项目地址（微信等）
            DocHeadDefault: '/images/default_img.png',  //医生默认头像
            PicDefautl: '/images/noPic.png',  //图片加载问题时，默认显示图片
            ThirdSalePic: '/images/third_sale_icon.png',  //第三厂商默认图标
        }
        break;
    case "mall-test":  //预发布
        path = {
            imgURL:'',//图片路径
            cssURL:'',//css路径
            uploadImg:'http://8098.commons.test.zoenet.cn',  //平台部图片资源
            uploadApi:"http://8098.commons.test.zoenet.cn/commons/ctrl-http/upload",//上传接口
            imgHC: 'http://8098.hc.test.zoenet.cn',   //健康城市的图片资源
            jsURL:'',//js路径
            appId:'wxb7b06cd95c35d3e4',//艾嘉支付的appid
            wxpayBackUrl:"http://mall.commons.test.zoenet.cn",
            wxpayUrl:'http://ijwx.juyihui.net/zoe-ijhealth-mobile-wechat/getopenId',//艾嘉支付获取授权的地址
            HCH5Url: 'http://4000.hc.test.zoenet.cn',    //健康城市H5项目地址（微信等）
            DocHeadDefault: '/images/default_img.png',  //医生默认头像
            PicDefautl: '/images/noPic.png',  //图片加载问题时，默认显示图片
            ThirdSalePic: '/images/third_sale_icon.png',  //第三厂商默认图标
        }
        break;
    case "mall-formal":  //正式库
        path = {
            imgURL:'',//图片路径
            cssURL:'',//css路径
            uploadImg:'http://8098.commons.zoenet.cn',  //平台部图片资源
            uploadApi:"http://8098.commons.zoenet.cn/commons/ctrl-http/upload",//上传接口
            imgHC: 'http://8098.hc.zoenet.cn/img',   //健康城市的图片资源
            jsURL:'',//js路径
            appId:'wxb7b06cd95c35d3e4',//艾嘉支付的appid
            wxpayBackUrl:"http://mall.commons.zoenet.cn",
            wxpayUrl:'http://ijwx.juyihui.net/zoe-ijhealth-mobile-wechat/getopenId',//艾嘉支付获取授权的地址
            HCH5Url: 'http://4000.hc.zoenet.cn',    //健康城市H5项目地址（微信等）
            DocHeadDefault: '/images/default_img.png',  //医生默认头像
            PicDefautl: '/images/noPic.png',  //图片加载问题时，默认显示图片
            ThirdSalePic: '/images/third_sale_icon.png',  //第三厂商默认图标
        }
        break;
    case "mall-demo":  //演示环境
        path = {
            imgURL:'',//图片路径
            cssURL:'',//css路径
            uploadImg:'http://60.216.53.112:8000/platfile',  //平台部图片资源
            uploadApi:"http://60.216.53.112:8000/platfile/commons/ctrl-http/upload",//上传接口
            imgHC: 'http://60.216.53.112:8000/hcfile',   //健康城市的图片资源
            jsURL:'',//js路径
            appId:'wxb7b06cd95c35d3e4',//艾嘉支付的appid
            wxpayBackUrl:"http://60.216.53.112:8000/mall",
            wxpayUrl:'http://ijwx.juyihui.net/zoe-ijhealth-mobile-wechat/getopenId',//艾嘉支付获取授权的地址
            HCH5Url: 'http://4000.hcmobile.sdij.zoenet.cn:8000',    //健康城市H5项目地址（微信等）
            DocHeadDefault: '/images/default_img.png',  //医生默认头像
            PicDefautl: '/images/noPic.png',  //图片加载问题时，默认显示图片
            ThirdSalePic: '/images/third_sale_icon.png',  //第三厂商默认图标
        }
        break;
}
module.exports = path;

