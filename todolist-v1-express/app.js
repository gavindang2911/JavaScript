const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [
    { id: 1, name: 'Read book'},
    { id: 2, name: 'Do homework'}
];
var count = 2;
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
    console.log("asdasd");
    var newItem = req.body.newItem;
    // res.render("list", {newListItem: item});
    console.log(newItem);
    var b = {id:count++, name: newItem};
    items.push(b);
    res.redirect("/");
})

app.get("/search", (req, res)=>{
    var q = req.query.q;
    var matchedItem = items.filter(function(item) {
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render("list", {
        kindOfDay: "",
        newListItems: matchedItem
    });
})


app.listen(3000, ()=>{
    console.log("Starting server on port 3000");
});