const db = require('../db');
const _ = require("lodash");

module.exports.index = (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
  
    db.get('articles').value().forEach(function(post) {
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title:post.title,
          content:post.content
        });
      }
    })
    
};