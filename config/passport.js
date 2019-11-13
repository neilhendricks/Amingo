const PassportJWT = require("passport-jwt");
const JwtStrategy = PassportJWT.Strategy;// generates the json web token (JWT)
const ExtractJwt = PassportJWT.ExtractJwt;// this object allows us to extract username and pasword from token
const secret = process.env.SECRET;// takes information and combine it to create 

const User = require("../models/User");// passport checks database in User for credentials

// Options for passport-jwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

//Create a function for authenticating each express request
const initPassportStrategy = (passport) => {
    const theJwtStrategy = new JwtStrategy(opts, (jwtPayload, done)=>{
        //See if a user with the id exists (in the payload)
        User
        .findById(jwtPayload.id)
        .then((theUser)=>{
            if(theUser) {
                return done(null, theUser);
            }
            else {
                return done(null, false);
            }
        })
        .catch((err)=>{
            console.log("error", err);
            return done(null, null);
        })
    });
    passport.use(theJwtStrategy)
}

module.exports = initPassportStrategy;
 