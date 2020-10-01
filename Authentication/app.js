require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const md5 = require("md5");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// lv4
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Level 2 auth - encryption
// const encrypt = require("mongoose-encryption");
// var encKey = process.env.SOME_32BYTE_BASE64_STRING;
// var sigKey = process.env.SOME_64BYTE_BASE64_STRING;
// userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['password'] });
// //32 bytes
// require('crypto').randomBytes(32, function(err, buffer) {
//     var token = buffer.toString('base64');
//     console.log(token);
// });
// //64 bytes
// require('crypto').randomBytes(64, function(err, buffer) {
//     var token = buffer.toString('base64');
//     console.log(token);
// });


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login",{
        errors: {},
        values: {}
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", (req,res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.post("/register", (req, res) => {
    //lv 5
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            })
        }
    })


    // lv4
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     const newUser = new User({
    //         email:req.body.username,
    //         password:hash
    //     });
    
    //     newUser.save((err)=>{
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.render("secrets");
    //         }
    //     });
    // });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    // const password = md5(req.body.password);
    const password = req.body.password;

    var errors = [];

    if (!username) {
        errors.push("Email is required");
    }
    if (!password) {
        errors.push('Password is required');
    }

    if (errors.length) {
        res.render("login", {
            errors: errors,
            values: req.body
        });
        return;
    }

    // lv4
    // User.findOne({email:username}, (err, foundUser) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (foundUser) {
    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 // result == true
    //                 if (result == true) {
    //                     res.render("secrets");
    //                 } else {
    //                     res.render("login", {
    //                         errors: [
    //                             'Wrong password'
    //                         ],
    //                         values: req.body
    //                     });
    //                     return;
    //                 }
    //             });

    //         } else {
    //             res.render("login", {
    //                 errors: [
    //                     'User does not exist.'
    //                 ],
    //                 values: req.body
    //             });
    //             return;
    //         }
    //     }
    // })
});

app.listen(4000, function(){
    console.log("Server start successfully");
});