const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
require("./config/server-config")(app);

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("Povezan na MongoDB bazu!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
