var express = require('express');
var router = express.Router();
var goodsMallApi = require("./goods-mall-api");

router.get('/index',function(req,res,next) {
    res.render('goods-mall/goods-index');
})



module.exports = router;