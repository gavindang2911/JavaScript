//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const ejs = require("ejs");
const _ = require("lodash");
const db = require('./db');

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('asdgawefawb12141'));
app.use(express.static("public"));

const authMiddleware = require('./middlewares/auth.middleware');

const mainRoutes = require('./routes/main.route');
app.use('/', mainRoutes);

const composeRoutes = require('./routes/compose.route');
app.use('/compose',authMiddleware.requireAuth, composeRoutes);

const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);

const aboutController = require('../Blog-project/controllers/about.controller');
app.get("/about", aboutController.index);

const contactController = require('../Blog-project/controllers/contact.controller');
app.get("/contact", contactController.index);

const postsRouter = require('./routes/posts.route');
app.use("/posts/:postName",authMiddleware.requireAuth, postsRouter);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
