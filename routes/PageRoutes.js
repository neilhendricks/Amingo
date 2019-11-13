const express = require('express');
const router = express.Router();
//Our first route
// first arugment in get function is the route, second argument is a calback function
//res object comes from express and it sends html
router.get("/", (req, res)=> {
    res.send("Welcome Home")
}) 
/*app.get('/', function (req, res) {
  res.send('Hello World')
})
 */
// 3000 is a port number, goes up to 8000
//by default the ip address of your computer is http://127.0.0.1  also http://localhost
router.get("/about", (req,res)=>{
    res.send("<h1> About Page </h1>")
});

router.get("/contact", (req,res)=>{
    res.send("<h1> Contact Page </h1>")
})

router.get("/profile", (req,res)=>{
    res.send("<h1> Profile Page </h1>")
})

// the : creates a variable page, making everthing that comes after blog/ dynamic,
// so we don't have to go through the process of creating a new page like we did with profile, contact, about
router.get("/blog/:page", (req,res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
})

//below code needs to go last because of js cascading flow
router.get("*", (req, res)=> {
    res.send("<h1>404 Error!!!! Page Not Found :(</h1>")
}) 

module.exports = router;