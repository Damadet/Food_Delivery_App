const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  auth: {
    user: "okoliechukwuebukathereson@gmail.com",
    pass: "qawtnjwrtkgmgkza",
  },
};
const transporter = nodemailer.createTransport(config);

const message = {
  from: "okoliechukwuebukathereson@gmail.com",
  to: "gerardokolie09@gmail.com",
  subject: "user verification",
  html: "hello from server",
};

// transporter.sendMail();

module.exports = { transporter };
