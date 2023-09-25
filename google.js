const dotenv = require("dotenv");
dotenv.config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const passport = require("passport");
const User = require("./Model/users.js");

// Determine the redirect URI based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const redirectURI = isProduction
  ? 'https://reelink.onrender.com/authRoute/callBack'
  : 'http://localhost:8000/authRoute/callBack';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: redirectURI, // Use the conditional redirect URI
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const resFromDB = await User.findOne({ email: profile._json.email });
      if (resFromDB) {
        return cb(null, resFromDB);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile._json.name,
          picture: profile._json.picture,
          email: profile._json.email,
        });
        return cb(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
