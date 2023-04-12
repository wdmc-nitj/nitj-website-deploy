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
          from: "adityanmt@gmail.com",
          to: req.body.email,
          subject: "Reset your Password",
          html: `<div>
                    <a href="${url}/dept/${dept}/confirmation/${token}">
                    "${url}/dept/${dept}/confirmation/${token}"
                    </a>
            </div>`,
        },
        function (err, info) {
          if (err) {
            console.log(err);
            return res.redirect(
              `${url}/dept/cse/onClickForgotPass/failure`
            );
          }

          return res.redirect(
            `${url}/dept/cse/onClickForgotPass/success`
          );
        }
      );
    }
    else
    return res.redirect(
      `${url}/dept/cse/onClickForgotPass/failure/`
    );
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
          .redirect(`${url}/dept/${dept}/faculty/${id}`);
      }
    }
    return res.status(200).redirect(`${url}/${dept}/faculty`);
  }
};
