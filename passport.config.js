const passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let User = require('./db').User;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        //done(null, user);
        User.findByPk(id)
            .then((user) => { done(null, user); })
            .catch((err) => { done(err, null); });
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/login/callback',
            },
            async function (accessToken, refreshToken, profile, cb) {
                let existingUser = await User.findOne({ where: { google_id: profile.id } });

                if (existingUser) {
                    cb(null, existingUser);
                }
                else {
                    let newUser = await User.create({ google_id: profile.id, display_name: profile.displayName });
                    cb(null, newUser);
                }
            }
        )

    );
};