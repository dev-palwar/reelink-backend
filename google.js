import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "./Model/users.js";

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
