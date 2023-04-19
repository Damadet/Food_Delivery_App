const { check, validationResult} = require("express-validator");

exports.validateUser = [
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is missing!"),
    check("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Lastname is missing!"),
    check('Email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
    check("Password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min:8, max: 20})
    .withMessage('Password must be 8 - 20 characters long')

];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array()
  if(!error.length) return next()

  res.status(400).json({success: false, error: error[0].msg})
}