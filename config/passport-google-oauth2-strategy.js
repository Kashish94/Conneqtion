const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
    new googleStrategy({
            clientID: "430909875612-29b4eulntcpmpji7a69ideehe5sg5ag7.apps.googleusercontent.com",
            clientSecret: "JpqCPVOz1kt4oJY1hOkKJKv-",
            callbackURL: "http://localhost:8000/users/auth/google/callback"
        },

        function(accessToken, refreshTooken, profile, done) {
            //find a user
            User.findOne({ email: profile.emails[0].value }).exec(function(
                err,
                user
            ) {
                if (err) {
                    console.log("error in goggle strategy-passport", err);
                    return;
                }
                console.log(accessToken);
                console.log(profile);

                if (user) {
                    //if found,set his user as req.user
                    return done(null, user);
                } else {
                    //if not found, create the user and set it as req.user
                    User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: crypto.randomBytes(20).toString("hex")
                        },
                        function(err, user) {
                            if (err) {
                                console.log(
                                    "error in creating user goggle strategy-passport",
                                    err
                                );
                                return;
                            }
                            return done(null, user);
                        }
                    );
                }
            });
        }
    )
);

module.exports = passport;