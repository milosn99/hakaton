const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const users = require("../routes/users.routes");
const google = require("../routes/google.routes");
require("../config/passport-config");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/images", express.static(path.join("./", "/resources/images")));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/api/users", users);
  app.use("/auth/google", google);
};
