const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send("Invalid token.");
  }
};
