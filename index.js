const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");

const app = express();

app.set("view engine", "ejs");
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["cookieKey"],
  })
);

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

require("./config/routes")(app);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("Povezan na MongoDB bazu!"));

// app.get("/home", (req, res) => {
//   res.render("home", { user: req.user });
// });

// app.get("/login", (req, res) => {
//   res.render("login", { user: req.user });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
