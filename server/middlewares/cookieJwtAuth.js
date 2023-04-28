const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err.message);
        res.redirect("/user/login");
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.redirect("/user/login");
  }
};

module.exports = { checkAuth };
