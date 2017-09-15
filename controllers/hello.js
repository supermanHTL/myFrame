var hello = async(cxt,next) => {
    cxt.response.type = 'text/html';
    cxt.response.body = '<h1>hello , this hello page, welcome !</h1>';
}
module.exports = {
    'GET /hello': hello
}