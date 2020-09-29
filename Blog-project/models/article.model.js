const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    email: String,
    password: String,
    title: String,
    content: String,
    image: String
});

const Article = mongoose.model('Article', articleSchema, 'articles');

module.exports = Article;