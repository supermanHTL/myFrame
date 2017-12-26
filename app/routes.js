const interceptor = require('./common/interceptor');
const goods = require('./goods-mall/goods-mall');
const login = require('./login/login');

exports.route = function(app) {
    app.use(interceptor.requestInterceptor);
    app.use('/goods-mall',goods);
    app.use('/login',login);
}