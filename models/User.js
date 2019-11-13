//This file creates a schema, where we specify the structure of all the information we put in the database
//This file takes the shcema and creates and object that we export to the database
// Import mongoose
const mongoose = require("mongoose")

//Assign the Schema object
const Schema = mongoose.Schema

//Every User that goes into mongoDB has to follow this structure described in the schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    occupation: {
        type: String
    },
    date: {
        type: Date,
        default:Date.now
    }
})


//we are using the .model function to turn the schema into a model, which is an object that has functions
// when we do this, we create the object called user
/*now we cn use functions like
User.find()
User.findMany()
User.upsert() this updates and inserts a file
GO TO MONGOOSE.JS/DOCS/QUERIES to find all query functions
*/
module.exports= User = mongoose.model("user", UserSchema)
//Once we create the model, we need it in the server.js file, so we have to export it to server.js