//File for Routes to make server.js neater

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const router = express.Router();// We just want Route function from express, only one psecific thing from express
const User = require("../models/User");
router.post("/register", (req, res) => {

    const formData = {
        //req is an object, and body is another object in req
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }


    // Saves user information in database
    const newUser = new User(formData);
    // Step 1. Generate a salt (random data for adding complexity)
    bcrypt.genSalt((err, salt) => {
        if (err) {
            console.log('error is', err);
        }
        // Step 2. Generate a hashed password using (a) the user's password
        // and (b) the salt
        bcrypt.hash(
            newUser.password,
            salt,
            (err, hashedPassword) => {
                if (err) {
                    console.log('error is', err);
                }

                // Step 3. Reassign the user's password to be hashed password
                newUser.password = hashedPassword;
                // Step 4. Saving the formData to the database
                newUser
                .save()//Promise this is a mongoose function, and all return values of monogoose functions are promises
                //If promise is fullfilled
                .then((newUserData) => {
                    //Send response in the form of JSON
                    res.json(newUserData)
                })
                //Otherwise...
                .catch((err) => {
                    console.log("error", err)
                })

            }
        )
    })
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Step 1. Check to see if account with specified email exists
    User
        .findOne({ email: email })
        .then((theUser) => {
            //Checking the database to see if theUser exists
            if (theUser) {
                //Step 2. Compare the submitted password with the encrypted password in the database
                bcrypt
                    .compare(password, theUser.password)
                    .then((isMatch) => {
                        //If password is correct
                        if (isMatch) {
                            // Step 3. Decide the payload (encrypted data you want to send back to client)
                            const payload = {
                                id: theUser.id,
                                email: theUser.email
                            }

                            //Step 4. Generate the JSON Web Token
                            jwt.sign(
                                payload,
                                secret,
                                (err, theJWT) => {
                                    //Step 5. Send the JWT to the client
                                    res.json({ token: theJWT })
                                }
                            )
                        } else {
                            res.json({ message: "Wrong password" })
                        }
                    })
                    .catch()
            }
            //If account doesnt exist
            else {
                res.json({ message: "No user with this account exists" })
            }
        })
        .catch()

})

module.exports = router