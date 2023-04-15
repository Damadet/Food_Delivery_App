const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  auth: {
    user: "okoliechukwuebukathereson@gmail.com",
    pass: "qawtnjwrtkgmgkza",
  },
};
const transporter = nodemailer.createTransport(config);

module.export = transporter;
