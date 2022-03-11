const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://hakaton-vezba.herokuapp.com/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.email }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          let korisnik = new User({
            name: profile.displayName,
            email: profile.email,
          });
          korisnik.save().then((newUser) => {
            console.log("created new user: ", newUser);
            done(null, newUser);
          });
        }
      });
    }
  )
);
