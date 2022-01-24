var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id }, function (err, user) {
        done(err, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://xchange-trading-terminal.herokuapp.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id, email: profile.emails[0].value, name: profile.name.givenName + " " + profile.name.familyName }, function (err, user) {
            return cb(err, user);
        });
    }
));