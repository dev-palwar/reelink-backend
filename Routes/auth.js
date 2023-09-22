import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import {
  addToWatchlist,
  getUser,
  logout,
  throwError,
} from "../Controllers/user.js";
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Chal raha hai" }));
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/login/failed", throwError);

router.get("/getUser", getUser);

router.get(
  "/authRoute/callBack",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/addToWatchlist", addToWatchlist);

router.get("/logout", logout);

export default router;