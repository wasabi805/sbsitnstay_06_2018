const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users'); //'users' is from module.exports from User model
const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// 'passport' is from server.js : require('./config/passport')(passport)
// 'jwt_payload' includes the user data we included in users.js ==>const payload ={ id: user.id, firstName: user.firstName ...}

module.exports= (passport) =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }

                    return done(null, false);
                }).catch(err => console.log(err))
        }));
};