const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
// const env = require('../.env');

const smtp = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: 'false',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
};

let transport = nodemailer.createTransport(smtp);

module.exports = transport;
