const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');   //编译前先清空指定文件夹


/*
 * 根据public/js返回一个webpack入口的对象，实现多模块打包
 * （即一个页面一个模块）
 * */
function addEntry(dirpath) {
    let dirArr = fs.readdirSync(dirpath);  //获取文件夹里面所有的文件名，返回一个数组集合
    let obj = {};
    dirArr.forEach((item,index) => {
        let filepath = path.join(dirpath,dirArr[index]);
        let fileArr = fs.readdirSync(filepath);
        fileArr.forEach((_item,_index) => {
            let key = dirArr[index] + '_' + _item.replace(/.js$/,'');
            obj[key] = path.join(dirpath,dirArr[index],_item);
        })
    })
    return obj;
}

module.exports = {
    devtool: 'eval-source-map',  //在浏览器中可查看打包前的原文件，进行断点调试
    //webpack入口在puclic/js，根据这里的js进行多模块打包
    entry: addEntry(path.resolve('./public/js/page')),
    output: {
        path: path.resolve('dist'),
        filename:'[name].bundle.js',
        //publicPath: '/'    //用于在webpack-dev-middleware和express，让静态资源能正确访问
    },
    module: {
        loaders: [
            {test: /\.js$/,loader:'babel-loader'},
            { test: /\.vue$/, loader: 'vue-loader'},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader!postcss-loader'
            }
        ]
    },
    resolve: {
        alias: {'vue': 'vue/dist/vue.js'}     //设置别名
    },
    plugins: [
        //new CleanWebpackPlugin(['dist']),     //编译前清空，dist文件夹
        /*new webpack.optimize.CommonsChunkPlugin({
            names: 'common',  //公共模块打包后的js名称
            minChunks: 2     //设置公共模块被引用的次数，满足次数及以上才能被打包进commom.bundle.js里。
            //！注意：如果属性chunks没有设置，当前属性minChunks也没有设置，则打包后的
            //common.bundle.js里面是没有任何公共模块。所以chunks和minChunks属性必须设置
            //一个才有意义。

        }),*/
    ]
}