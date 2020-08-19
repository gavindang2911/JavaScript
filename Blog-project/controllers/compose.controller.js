const db = require('../db');

module.exports.index = (req, res) => {
    res.render("compose", {
        errors:[]
    });
};

module.exports.create = (req, res) => {
    
    var post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    db.get('articles').push(post).write();
    res.redirect("/");
};

