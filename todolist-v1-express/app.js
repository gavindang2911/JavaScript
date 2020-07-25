const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    var today = new Date();
    
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", option);

    res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", (req, res) =>{
    var newItem = req.body.newItem;
    // res.render("list", {newListItem: item});
    items.push(newItem);
    res.redirect("/");
})


app.listen(3000, ()=>{
    console.log("Starting server on port 3000");
});