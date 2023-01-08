const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res){
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/", function(req,res){
    let weight = Number(req.body.weight)
    let height = Number(req.body.height)
    let bmi = weight / (height * height)
    res.send("Your BMI is " + bmi)
})

app.listen(3000)