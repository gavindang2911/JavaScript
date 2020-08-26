const db = require('../db');

module.exports.index = (req, res) => {
    res.render("compose", {
        errors:[]
    });
};

module.exports.create = (req, res) => {
    if (req.file && req.file.path) {
        req.body.image = req.file.path.split('/').slice(1).join('/');
    }
    // var post = {
    //     title: req.body.postTitle,
    //     content: req.body.postBody,
    //     image: req.body.image
    // };
    db.get('articles').unshift(req.body).write();
    res.redirect("/");
};

