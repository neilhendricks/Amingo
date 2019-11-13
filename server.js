// require is a module that imports a package into your file. In this case it imports the express package from node_modules
const express = require('express')
// bodyparser is a package that allows us to use post requests to send sensitive information in a body
const bodyParser=require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
//Importing routes
const UserRoutes = require ("./routes/UserRoutes"); 
const FeedRoutes = require("./routes/FeedRoutes");
const PageRoutes = require("./routes/PageRoutes");
const CompanyRoutes = require("./routes/CompanyRoutes");
const initPassportStrategy= require("./config/passport")// function
//instantiating express, turns app into object
const app = express()

//tell express to use bodyparser so we can use post request
app.use(bodyParser.urlencoded({extended: false}))
//tells express to use bodyparser, it may come in the form of json
app.use(bodyParser.json());
app.use(passport.initialize());
initPassportStrategy(passport);//passport-jwt
//.get function takes in two arguments, first is route, then is callback
//The following code allows us to connect to the database. We use mongoose to connect to MongoDB
const db = process.env.MONGO_URI;// took out string to hide in env file before uploading to github
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})// promise
.then(()=>{
    console.log("DB is connected")
})
.catch(()=>{
    console.log("error", err)
})// if you are not able to fullfill a promise, catch will handle the error

app.use(
    "/users",
    UserRoutes
);

app.use(
    "/feed",
    passport.authenticate("jwt", {session: false}),//middleware
    FeedRoutes
);

app.use(
    "/company",
    passport.authenticate("jwt", {session: false}),//middleware
    CompanyRoutes
);

app.use(
    "/",
    PageRoutes
)

// listen connects your app to the given port, in this case 3001
app.listen(process.env.PORT || 3001, ()=> {
    console.log("You are connected!")
})