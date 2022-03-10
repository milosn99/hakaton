const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.model");

// router.get("/login", (req, res) => {
//   res.render("login", { user: req.user });
// });

// // auth logout
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/home");
// });

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/callback", passport.authenticate("google"), async (req, res) => {
  let user = null;
  if (req.user.email) {
    user = await User.findOne({ email: req.user.email });
  }

  const token = user.generateAuthToken();

  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
});

module.exports = router;
