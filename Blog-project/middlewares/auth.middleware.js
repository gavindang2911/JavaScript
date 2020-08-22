var db = require('../db');
module.exports.requireAuth = function(req, res, next) {
    if(!req.signedCookies.articleTitle && req.url != '/auth/login') {
        res.redirect('/auth/login');
        return;
    } 
    var user = db.get('articles').find({ title: req.signedCookies.articleTitle}).value();

    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    next();
};