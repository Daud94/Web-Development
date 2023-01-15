const express = require("express")
const bodyParser = require("body-parser")
// const path = require("path");
const date = require(__dirname + "/date.js")

const app = express()
let items = []
let workItems = []

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// get request for home route
app.get("/", function (req, res) {

    let day = date.getDate()

    res.render("list", {listTitle: day, newListItems: items})
})
// post request for home route
app.post("/", (req, res) => {
    let item = req.body.newItem
    if (req.body.list === "work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }

})
// get request for work route
app.get("/work", (req, res) => {
    res.render("list", {listTitle: "work", newListItems: workItems})
})

// post request for work route
app.post("/work", (req, res) => {
    let item = req.body.newItem
    console.log(item)
    workItems.push(item)
    res.redirect("/work")
})

// get request for about route
app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})