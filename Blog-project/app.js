//jshint esversion:6
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware'); 

let app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public"));

app.use(sessionMiddleware);

const cartRoutes = require('./routes/cart.route');
app.use('/cart', cartRoutes);


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
app.use("/posts",authMiddleware.requireAuth, postsRouter);

const productsRoute = require('./routes/products.route');
app.use('/products', productsRoute);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
