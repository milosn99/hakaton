const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const users = require("../routes/users.routes");
const google = require("../routes/google.routes");
const session = require("express-session");
require("./passport-config");

module.exports = function (app) {
  app.use(express.json());

  app.use(cors({ origin: true, credentials: true }));
  app.use("/images", express.static(path.join("./", "/resources/images")));

  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "bla bla bla",
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/users", users);
  app.use("/auth/google", google);
};
