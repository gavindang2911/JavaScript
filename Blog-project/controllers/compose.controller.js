const db = require('../db');

module.exports.index = (req, res) => {
    res.render("compose", {
        errors:[]
    });
};

module.exports.create = (req, res) => {
    var errors = [];
    if (!req.body.postTitle) {
        errors.push("Title is required");
    }

    if (!req.body.postBody) {
        errors.push('Body is required');
    }

    if (errors.length) {
        res.render("compose", {
            errors: errors
        });
        return;
    }
    var post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    db.get('articles').push(post).write();
    res.redirect("/");
};

