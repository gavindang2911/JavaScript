require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['password'] });
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
const User = new mongoose.model("User", userSchema);


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

app.post("/register", (req, res) => {
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    });

    newUser.save((err)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
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

    User.findOne({email:username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                } else {
                    res.render("login", {
                        errors: [
                            'Wrong password'
                        ],
                        values: req.body
                    });
                    return;
                }
            } else {
                res.render("login", {
                    errors: [
                        'User does not exist.'
                    ],
                    values: req.body
                });
                return;
            }
        }
    })
});

app.listen(4000, function(){
    console.log("Server start successfully");
});