// require is a module that imports a package into your file. In this case it imports the express package from node_modules
const express = require('express')

// bodyparser is a package that allows us to use post requests to send sensitive information in a body
const bodyParser=require("body-parser")

const mongoose = require("mongoose")
//Importing User model from User.js
const User = require("./models/User")
//Importing Feed model from Feed.js
const Feed = require("./models/Feed") 
//instantiating express, turns app into object
const app = express()

//tell express to use bodyparser
app.use(bodyParser.urlencoded({extended: false}))
//tells express to use bodyparser, it may come in the form of json
app.use(bodyParser.json());
//app is an object
//.get function takes in two arguments, first is route, then is callback
const db = "mongodb+srv://neilhendricks:4mongodb@cluster0-e7sn4.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})// promise
.then(()=>{
    console.log("DB is connected")
})
.catch(()=>{
    console.log("error", err)
})// if you are not able to fullfill a promise, catch will handle the error


//Our first route
app.get("/", (req, res)=> {
    res.send("Welcome Home")
}) 
/*app.get('/', function (req, res) {
  res.send('Hello World')
})
 */
// 3000 is a port number, goes up to 8000
//by default the ip address of your computer is http://127.0.0.1  also http://localhost
app.get("/about", (req,res)=>{
    res.send("<h1> About Page </h1>")
});

app.get("/contact", (req,res)=>{
    res.send("<h1> Contact Page </h1>")
})

app.get("/profile", (req,res)=>{
    res.send("<h1> Profile Page </h1>")
})

// the : creates a variable page, making everthing that comes after blog/ dynamic,
// so we don't have to go through the process of creating a new page like we did with profile, contact, about
app.get("/blog/:page", (req,res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
})

app.post("/register", (req,res)=>{
    
    const formData = {
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email,
         password : req.body.password,
    }
    
    //
    const newUser = new User(formData);
    newUser
    .save()//Promise
    //If promise is fullfilled
    .then((newUserData)=>{
        //Send response in the form of JSON
        res.json(newUserData)
    })
    //Otherwise...
    .catch((err)=>{
        console.log("error",err)
    })


    // sends information in the form of json
    res.json(formData)
})

//Post route for feed
app.post("/feed", (req, res)=> {
    const formData = {
        userName: req.body.userName,
        comment: req.body.comment,
        image: req.body.image,
        tags: req.body.tags,
        likes: req.body.likes,
        shares: req.body.shares,
    }
})

const newFeed = new Feed(formData)
newFeed
.save()
.then(newFeedDAta => {
    res.json(newFeedData)
})
.catch((err)=>{
    console.log("error",err)
})
res.json(formData)


// listen connects your app to the given port, in this case 3001
app.listen(3001, ()=> {
    console.log("You are connected!")
})