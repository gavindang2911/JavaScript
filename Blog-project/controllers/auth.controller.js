const db = require('../db');
const md5 = require('md5');

module.exports.login = (req, res) => {
    res.render("auth/login",{
        errors: {},
        values: {}
    });
};

module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('articles').find({email:email}).value();

    var errors = [];
    if (!email) {
        errors.push("Email is required");
    }

    if (!password) {
        errors.push('Password is required');
    }
    if (errors.length) {
        res.render("auth/login", {
            errors: errors,
            values: req.body
        });
        return;
    }

    if (!user) {
        res.render("auth/login", {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    var hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        res.render("auth/login", {
            errors: [
                'Wrong password'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('articleTitle', user.title )
    res.redirect('/');

};