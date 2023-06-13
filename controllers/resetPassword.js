const Faculty = require("../models/Faculty");
const nodemailer = require("../config/reset_password_mailer");
const crypto = require("crypto");
const ResetPassword = require("../models/ResetPassword");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
url=process.env.DEPT_URL
module.exports.resetEmailHandler = async function (req, res) {
  
  try {
    const faculty = await Faculty.find({ email: req.body.email });
    const dept = req.params.dept;
    const url = `http://departments.nitj.ac.in/dept/${dept}`;
    // url="http://nitjintranet.ac.in:8081"

    if (faculty[0]?._id) {
      const token = crypto.randomBytes(20).toString("hex");

      const resetToken = await ResetPassword.create({
        user_id: faculty[0]?._id,
        token_id: token,
        createdOn: Date.now(),
      });
      

      await nodemailer.sendMail(
        {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset your Password",
          html: `<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="border-collapse: collapse;">
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 20px 40px 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #555555;">
              <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 20px 0;">Forgot Password</h2>
              <p>Hello,</p>
              <p>Click the link below to reset your password:</p>
              <p><a href="${url}/confirmation/${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none;">Reset Password</a></p>
              <p>If you didn't request this password reset, please ignore this email.</p>
              <p>Thank you,<br>Webmaster<br>National Institute of Technology, Jalandhar</p>
            </td>
          </tr>
        </table>`,
        },
        function (err, info) {
          if (err) {
            console.log(err);
            console.log(url);
            return res.redirect(
              `${url}/onClickForgotPass/failure`
            );
          }

          return res.redirect(
            `${url}/onClickForgotPass/success`
          );
        }
      );
    }
    else{
      console.log(url);
      return res.redirect(
        `${url}/onClickForgotPass/failure/`
      );

    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkToken = async function (req, res) {
  const token = req.params.token;
  const resetPasswordToken = await ResetPassword.find({ token_id: token });
  let isValid = false;

  if (
    Date.now() - resetPasswordToken[0]?.createdOn.getTime() <
    15*60*60*100
  ) {
    isValid = true;
  }

  if (req.method == "GET") {
    if (resetPasswordToken && isValid) {
      return res.status(200).json({
        isValid: true,
      });
    }

    return res.status(200).json({
      isValid: false,
    });
  }
};

module.exports.modifyPassword = async function (req, res) {
  const token = req.params.token;
  const dept = req.params.dept;
  const resetPasswordToken = await ResetPassword.find({ token_id: token });
  const id = resetPasswordToken[0]?.user_id;
  const url = `http://departments.nitj.ac.in/dept/${dept}`;

  if (resetPasswordToken) {
    if (req.body.password == req.body.repassword) {
      if (req.body.password) {
        let password = await bcrypt.hash(req.body.password, 10);
        console.log(password);
        await Faculty.findByIdAndUpdate(resetPasswordToken[0]?.user_id, {
          $set: { password: password },
        });
        await ResetPassword.deleteMany({
          user_id: resetPasswordToken[0]?.user_id,
        });
        return res
          .status(200)
          .redirect(`${url}/faculty/${id}`);
      }
    }
    else{
      return res
          .status(200)
          .redirect(`${url}/onClickForgotPass/failure/`);
    }
    return res.status(200).redirect(`${url}/faculty`);
  }
};
