const passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let User = require('./db').User;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(
        new GoogleStrategy(
            {

                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/login/callback',
            },
            async function (accessToken, refreshToken, profile, cb) {
                let existingUser = await User.findOne({ where: { googleId: profile.id } });

                if (existingUser) {
                    cb(null, existingUser);
                }
                else {
                    let newUser = await User.create({ googleId: profile.id, displayName: profile.displayName });
                    cb(null, newUser);
                }
            }
        )

    );
};