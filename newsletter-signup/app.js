const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "f6e8ff1426bea9b1c8b07b7c6a19b6ae-us21",
    server: "us21"
})


const app = express()
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function (req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res){
    const body = req.body
    console.log(body)
    const firstName = body.firstName
    const lastName = body.lastName
    const email = body.email

    const run = async () => {
        const response = await client.lists.addListMember("0d2287345c",{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        })
        console.log(response)
    }
    run()
})

app.listen(3000, function (){
    console.log("Server is running on port 3000")
})

// API Key
// f6e8ff1426bea9b1c8b07b7c6a19b6ae-us21

// audience ID
// 0d2287345c