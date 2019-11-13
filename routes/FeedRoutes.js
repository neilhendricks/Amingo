const express = require('express')
const router = express.Router()
const Feed = require("../models/Feed")
//Post route for feed
router.post("/", (req, res)=> {
    const formData = {
        userName: req.body.userName,
        comment: req.body.comment,
        image: req.body.image,
        tags: req.body.tags,
        likes: req.body.likes,
        shares: req.body.shares,
    }


    const newFeed = new Feed(formData)
    newFeed
    .save()
    .then(newFeedDAta => {
        res.json(newFeedData)
    })
    .catch((err)=>{
        console.log("error",err)
        res.json(formData)
    })
})

//Post route for like counter in feed route
// async and await are like twins, they MUST be accompanied by each other
//await must be contained inside some function, and that function has to be async
router.post("/addLike", async(req, res)=> {  
    let userLikes;
    let theFeedID = req.body.feedid; //ID of the post the user is liking

    //1. Get the document with matching id
    let theDocument = await Feed    
    //await stops javascript from running all upcoming code until you get a response
    .find({_id: theFeedID}) //promise, find function returns an array of object
    .catch(err=>{
        res.send(err)
    })

    //2. Extract the likes from the document
    userLikes = theDocument[0].likes;//we want the first object,theFeedID, returned from the .find function
    console.log(userLikes)
        
    //3. Push the new like to the array
    //The following if statement checks if the user has already liked the post
    if (userLikes.includes(req.body.userid)) {
        userLikes.splice(userLikes.indexOf(req.body.userid))
    }// if the userid exists in the array of userid's that have liked the post, then remove the userid
    else{
        userLikes.push(req.body.userid)
    }
    
    //4. Update the document
    Feed
    .updateOne(
        {_id: theFeedID}, //what we want to update
        {likes: userLikes}// what we are changing in the update
        ) //promise
    .then(theFeed => {
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    })


})

module.exports = router;