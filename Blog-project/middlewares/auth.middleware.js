var db = require('../db');
module.exports.requireAuth = function(req, res, next) {
    if(!req.cookies.articleTitle && req.url != '/auth/login') {
        res.redirect('/auth/login');
        return;
    } 
    var user = db.get('articles').find({ title: req.cookies.articleTitle}).value();

    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    next();
};