const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const multer = require("../middlewares/multer");
const nodemailer = require("nodemailer");

router.post("/register", multer, async (req, res, next) => {
  try {
    let user = {
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
    };

    if (typeof req.file !== "undefined") {
      user.avatar = `public/avatars/${req.file.filename}`;
    } else {
      user.avatar = null;
    }

    let newUser = new User(user);
    newUser = await newUser.save();
    return res.status(201).json({
      message: "Registered new user",
      user: newUser,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/", async (req, res, next) => {
  if (req.body.email && req.body.password) {
    let user = null;
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    }
    if (!user) return res.status(404).json({ message: "Wrong credentials" });

    if (!user.isPasswordValid(req.body.password))
      return res.status(404).json({ message: "Wrong credentials" });

    const token = user.generateAuthToken();

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  }
});

router.post("/mail", async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let mailOptions = {
    from: process.env.USER,
    to: req.body.email,
    subject: "Dobrodosli",
    text: req.body.text,
    // attachments: [
    //   {
    //     filename: "package.json",
    //     path:
    //       "https://raw.githubusercontent.com/milosn99/hakaton/master/package.json",
    //   },
    // ],
  };

  await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).send("Can't send email");
    }
    return res.status(200).send("Email sent successfully");
  });
});

module.exports = router;
