require("dotenv").config();

// dotenv.config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDatabase = require("../Database/Config.js");
const router = require("../Routes/auth.js");
const app = express();

connectDatabase();
require("../google.js");

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
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server running smooth on PORT ${process.env.PORT}`)
);
