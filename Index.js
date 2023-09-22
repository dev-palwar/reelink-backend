import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectDatabase from "./Database/Config.js";
import router from "./Routes/auth.js";
const app = express();

connectDatabase();
import "./google.js";

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server running smooth on PORT ${process.env.PORT}`)
);
