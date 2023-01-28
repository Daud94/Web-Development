require('dotenv').config()
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const express = require("express")
const ejs = require("ejs")
const _ = require("lodash")
const mongooseEncrypt = require("mongoose-encryption")


const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// database connection

mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

//Users
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

// encrypting database
const secret = process.env.SECRET
userSchema.plugin(mongooseEncrypt,{secret:secret, encryptedFields:['password']})

const User = mongoose.model("user", userSchema)

app.get("/", (req, res) => {
    res.render("home")
})

app.route("/register")
    .get(function (req, res) {
        res.render("register")
    })
    .post(function (req, res) {
        const email = req.body.username
        const password = req.body.password

        const newUser = new User({
            email: email,
            password: password,
        })
        newUser.save(function (error){
            if (error){
                console.log(error)
            } else {
                res.render("secrets")
            }
        })
    })

app.route("/login")
    .get(function (req, res) {
        res.render("login")
    })
    .post(function (req, res) {
        const email = req.body.username
        const password = req.body.password

        User.findOne({email:email},function(error, foundUser){
            if (!error){
                if (email === foundUser.email){
                    res.render("secrets")
                }
            } else {
                res.render("login")
            }
        })
    })


app.listen(3000, function () {
    console.log("Listening on port 3000")
})
