var env="mall-dev";   //开发环境
// var env="mall-test";   //预发布环境
// var env="mall-formal";   //正式环境
// var env="mall-demo";   //演示环境
var config={
    //环境变量,设置环境变量
    environment:{
        commonEnv:env
    },
    /**
     * 平台API地址
     */
    apiPlatformUrl : {
        host:'172.16.34.220',
        port:'8080'
    },
    /**
     * log4js配置信息
     */
    log4jsOptions:{
        "appenders": [
            {
                "type": "console",
                "category": "console"
            },
            {
                "type": "dateFile",
                "filename": "logs/",
                "pattern": "public-app-yyyy-MM-dd.log",
                "alwaysIncludePattern": true,
                "pollInterval": 1,
                "category": "public-app",
                maxLogSize: 1024,
                backups:4
            }
        ],
        replaceConsole: true
    },
    /**
     * redis配置
     redisOptions : {
        port : 6379,//端口号
        host : 'localhost', //服务器IP
        //pwd : '', //密码
        //opts : {auth_pass:config.redisOptions.pwd} //设置项
        opts : {} //设置项
    },
     */
    /**
     * session配置
     * 正式库配置：host : 'localhost',
     * 测试库配置：host : '172.16.34.230',
     */
    sessionOptions : {
        port : 6379,//端口号
        host : '172.16.34.230',
        ttl : 60 * 60 * 24 * 30,   //Session的有效期为30天
        //  pass : 'zoenet'  //密码
    }
};
module.exports = config;