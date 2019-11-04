/* Exercise: 
Step 1. Create a file in models/Feed.js
Step 2. Create a schema
Step 3. Export the schema as a model
(Steps 1-3 will be done on this file, steps 4-6 will be written in server.js file)
Step 4. Import Feed.js into server.js
Step 5. Create a post route for '/feed'
Step 6. Save the post to database

Our Social media post will have the following qualities:
username
comment
image
likes
shares
date
*/

const mongoose = require("mongoose") // mongoose is an npm package that allows us to connect to and modify information in our database
// Step 2:Next we create the Schema for the Feed: This will describe the structure of the Feed
const Schema = mongoose.Schema
const FeedSchema = new Schema ({
    userName: {
        type: String,
        require: true
    },
    comment: {
        type: {}, //This allows for either strings or numbers
        require: true
    },
    image: {
        type: String
    },
    tags:{
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: String,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now 
    }
})

//Step 3: Exporting the schema as a model .model() 
module.exports= Feed = mongoose.model("feed", FeedSchema)