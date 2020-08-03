const express = require('express');
const db = require('../db');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("compose");
})
  
router.post("/", (req, res) => {
    var post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    db.get('articles').push(post).write();
    res.redirect("/");
})

module.exports = router;