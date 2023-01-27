const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const express = require("express")
const ejs = require("ejs")
const _ = require("lodash")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//mongoose connection
const dbName = "wikiDB"
const uri = `mongodb://127.0.0.1:27017/${dbName}`

mongoose.connect(uri)

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

// articles  model
const Article = mongoose.model("article", articleSchema)

// routes targeting all articles
app.route("/articles")
    .get(function (req, res) {
        Article.find({}, (err, articles) => {
            if (!err) {
                res.send(articles)
            } else {
                res.send(err)
            }
        })
    })
    .post(function (req, res) {
        console.log(req.body.title)
        console.log(req.body.content)

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save(function (error, savedArticle) {
            if (!error) {
                res.send(savedArticle)
            }
        })
    })
    .delete(function (req, res) {
        Article.deleteMany(function (error) {
            if (!error) {
                res.send("Successfully deleted all articles.")
            } else {
                res.send(error)
            }
        })
    })
// routes targeting a specific article
app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
            if (!err) {
                res.send(foundArticle.title)
            }
        })

    })
    .put((req, res) => {
        Article.updateOne({title: req.params.articleTitle}, {
            title: req.body.title,
            content: req.body.content
        }, {overwrite: true}, (err) => {
            if (!err) {
                res.send("Successfully updated article")
            }
        })
    })
    .patch((req,res) =>{
        Article.update(
            {title: req.params.articleTitle},
            {$set : req.body},
            function(err){
                if (!err){
                    res.send("Successfully updated articles")
                } else {
                    res.send(err)
                }
            }
        )
    })
    .delete(function (req, res) {
        Article.deleteOne(
            {title:req.params.articleTitle},
            function (error) {
                if (!error){
                    res.send("Successfullly deleted the article")
                } else {
                    res.send(error)
                }
            }
        )
    })

app.listen(3000, function () {
    console.log("listening on port 3000")
})