Tutorial from The Complete 2020 Web Development Bootcamp by Dr. Angela Yu

Learned from the lesson:
- Setting up the server:
    1. const express = require("express");
    2. const bodyParser = require("body-parser");
    3. const app = express();
    4. app.use(express.static("public")); 

        - Using body parser  
            5. app.use(bodyParser.urlencoded({extended: true}));
            + req.body... to get infor from input method POST

- How to use ejs template engines
    + app.set('view engine', 'ejs');


- Render syntax (to the ejs file)
    + res.render("list", {x: x', y: y'});
    + res.redirect("/"); (redirect to which page)

- When do search, remember the method is GET, input name is q represent for query, not a submit button
    + req.query.q to get infor from input method GET

- Including layout for header and footer for every page
    + <%- include("header") -%> 

- Using module export and require to use the object
    + exports.getDate = function () {... };
    + const date = require(__dirname + "/date.js");
    + let day = date.getDate();

- Using dynamic name for button (easy to check in which page the user hit the button add)
    + <button type="submit" name="list" value= <%= listTitle  %>>+</button>