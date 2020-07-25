const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');


app.get("/", function(req, res){
    // res.send("Hello!");

    var today = new Date();
    var currentDay = today.getDate();
    var day = "";

    if (currentDay === 6 || currentDay === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";
    }
    console.log(day);
    res.render("list", {kindOfDay: day});
});


app.listen(3000, ()=>{
    console.log("Starting server on port 3000");
});