const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

module.exports = {
  cookieJwtAuth,
};
