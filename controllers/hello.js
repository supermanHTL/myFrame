var hello = async(cxt,next) => {
    cxt.response.type = 'text/html';
    cxt.render('hello')
}
module.exports = {
    'GET /hello': hello
}