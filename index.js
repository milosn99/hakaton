const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");

const app = express();
require("./config/server-config")(app);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["cookieKey"],
//   })
// );

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("Povezan na MongoDB bazu!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
