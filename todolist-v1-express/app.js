const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");

const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

mongoose.connect("mongodb://localhost:27017/todolistDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo list"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res){
    // let day = date.getDay();
    // res.render("list", {listTitle: day, newListItems: items});

    Item.find({}, function(err, foundItems){

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){  
                if(err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default item to database")
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    });


});

app.post("/", (req, res) =>{

    const newItemName = req.body.newItem;
    const item = new Item({
        name: newItemName
    });
    item.save();
    res.redirect("/");

});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function(err) {
        if(!err) {
            console.log("Successfully deleted item");
            res.redirect("/");
        }
    });
});

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
    console.log("Starting server on port 5500");
});