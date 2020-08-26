const express = require("express");
const db = require('../db');
const bodyParser = require("body-parser");

const _ = require("lodash");
let app = express();


app.use(bodyParser.urlencoded({extended: true}));



module.exports.index = (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
  
    db.get('articles').value().forEach(function(post) {
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title:post.title,
          content:post.content,
          image: post.image
        });
      }
    })
    
};