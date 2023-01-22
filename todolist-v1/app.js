const express = require("express")
const bodyParser = require("body-parser")
// const path = require("path");
// const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// mongoose connection
const dbName = "todolistDb"
const uri = `mongodb://127.0.0.1:27017/${dbName}`

const runDB = async function () {
    await mongoose.connect(uri)
}

runDB().catch(err => {
    console.log(err);
})

const itemSchema = new mongoose.Schema({
    name: String,
})

const Item = mongoose.model("item", itemSchema)

const item1 = new Item({
    name: "Rice"
})

const item2 = new Item({
    name: "Beans"
})

const item3 = new Item({
    name: "Yam"
})

const defaultItems = [item1, item2, item3]
// custom list schema
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})

const List = mongoose.model("List", listSchema)
const insertAll = async function (items) {
    await Item.insertMany(items, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Success")
        }

    })
}


// get request for home route
app.get("/", function (req, res) {

    // let day = date.getDate()
    Item.find({}, function (error, foundItems) {
        if (foundItems.length === 0) {
            insertAll(defaultItems)
        }
        if (error) {
            console.log(error)
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems})
        }
    })
})

app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName
    // check if list name is already on the list
    List.findOne({name:customListName}, (error, foundList) => {
        if (!error){
            if (!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save()
                res.redirect("/" + customListName)
            }else {
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
            }
        }
    })

})
// add new item
app.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.newItem
    })
    const listName = req.body.list
    if ( listName === "Today") {
        newItem.save()
        res.redirect("/")
    } else {
        List.findOne({name: listName},(err, foundList) =>{
            foundList.items.push( )
        })
    }

})

const deleteItem = function (itemID) {
    Item.findByIdAndRemove({_id: itemID}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
}

// delete item
app.post("/delete", (req, res) => {
    const checkedItemID = req.body.checked
    console.log(checkedItemID)
    deleteItem(checkedItemID)
    res.redirect("/")
})

// // get request for work route
// app.get("/work", (req, res) => {
//     res.render("list", {listTitle: "work", newListItems: workItems})
// })
//
// // post request for work route
// app.post("/work", (req, res) => {
//     res.redirect("/work")
// })

// get request for about route
app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})