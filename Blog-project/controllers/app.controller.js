const db = require('../db');

module.exports.index = (req, res) => {
    res.render("home", {
      articles: db.get('articles').value()
    });
};