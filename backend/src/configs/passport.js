const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/usermodel');
const config = require('./db');
module.exports = (passport) => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById( jwt_payload._doc._id, (err, user) => {
            if (err) return done(err, false);
            if (user) { 
                done(null, user); 
            } else {
                done(null, false);
            }
        });
    }));
}