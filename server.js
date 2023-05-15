const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const acties = require("./routes/api/acties");
const groentenInfo = require("./routes/api/groentenInfo");

const app = express();

// Body parser middleWare
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Cors in express.js

const corsParameter = require("./config/keys").corsParameters;

var corsOptions = {
  origin: corsParameter,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => res.send("Hello"));

// Passport middelware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/acties", acties);
app.use("/api/groenteninfo", groentenInfo);

// process.env.port voor Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});