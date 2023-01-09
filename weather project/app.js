const express = require('express')
const bodyParser = require('body-parser')

const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res) {
    let cityName = req.body.cityName
    const query = cityName
    const apiKey = "40a09d9a3fe15110835d3fee2e6a81b1"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`
    https.get(url, function (response) {
        console.log(response.statusCode)
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "10d@2x.png"
            res.write("<p>The weather is currently" + weatherDescription + " </p>")
            res.write("<h1>The temperature in London is " + temp + "degrees </h1>")
            res.write("<img src=" + imageURL + ">");
            res.send()
        })

    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000")
})