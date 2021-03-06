const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
// const date = require(__dirname + "/date.js");

const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

mongoose.connect("mongodb+srv://admin-gavin:test123@cluster0.2p09v.mongodb.net/todolistDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

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

const listSchema = {
    name:String,
    items: [itemSchema]
};
const List = mongoose.model("List", listSchema);

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

app.post("/", (req, res) => {

    const newItemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: newItemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name:listName}, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName); 
        });
    }
    

});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err) {
            if(!err) {
                console.log("Successfully deleted item");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name:listName}, {$pull:{items:{_id: checkedItemId}}}, function(err, foundList){
            if (!err) {
                res.redirect("/" + listName);
            }
        })
    }


});

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList) {
        if(!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.redirect("/")
            } else {
                res.render("list",{listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    })

    
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


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, ()=>{
    console.log("Starting server successfully");
});