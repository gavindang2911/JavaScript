const db = require('../db');

module.exports.index = (req, res) => {
    res.render("home", {
      startingContent: "Welcome to my blog",
      articles: db.get('articles').value()
    });
};