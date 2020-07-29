const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [
    { id: 1, name: 'Read book'},
    { id: 2, name: 'Do homework'}
];

let workItem = [];
var count = 2;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 


app.get("/", function(req, res){
    var today = new Date();
    
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", option);

    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) =>{

    let newItem = req.body.newItem;
    if (req.body.list === "Work") {
        let a = {name: newItem};
        workItem.push(a);
        res.redirect("/work");
    } else {
        // res.render("list", {newListItem: item});
        var b = {id:count++, name: newItem};
        items.push(b);
        res.redirect("/");
    }
        
})

app.get("/search", (req, res)=>{
    var q = req.query.q;
    var matchedItem = items.filter(function(item) {
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render("list", {
        listTitle: "",
        newListItems: matchedItem
    });
})

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItem
    });
})

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect("/work");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(5500, ()=>{
    console.log("Starting server on port 3000");
});