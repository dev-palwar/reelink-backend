const dotenv = require("dotenv");
dotenv.config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const passport = require("passport");
const User = require("./Model/users.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/authRoute/callBack",
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
