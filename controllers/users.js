const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("./../models/users");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

exports.addUser = async (req, res) => {
  if (
    req.body?.name === undefined ||
    req.body?.email === undefined ||
    req.body?.password === undefined
  ) {
    return res.status(400).send("Error: Some field requried is required");
  }

  const userExist = await User.findOne({ email: req.body?.email });

  if (userExist) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await hashPassword(req.body?.password);

  const user = new User({
    name: req.body?.name,
    email: req.body?.email,
    password: hashedPassword,
  });

  user
    .save()
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getUser = async (req, res) => {
  if (req.body?.email === undefined || req.body?.password === undefined) {
    return res.status(400).send("Error: Some field requried is required");
  }

  const user = await User.findOne({ email: req.body?.email });

  if (!user) {
    return res.status(400).send("Error: This user does not exist");
  }

  const isValid = await verifyPassword(req.body?.password, user.password);

  if (!isValid) {
    return res.status(400).send("Error: Wrong Password");
  }

  jwt.sign( { user }, process.env.SECRET_KEY, { expiresIn: "30d" }, (err, token) => {
    if(err){
      return res.status(400).send("Error occured while signing");
    }

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now()+25892000000),
      httpOnly: true,
      secure: false,
    }).json({
      token: token,
      user: user,
      message: "success",
    })
  })
};

//----------------------------------------------------------------------->
exports.updateUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body?.password);
  User.findByIdAndUpdate(req.params.id, {
    name: req.body?.name,
    email: req.body?.email,
    password: hashedPassword,
    show: true,
  })
    .then(() => res.status(200).send("User updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("User deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallUsers = async (req, res) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(404).send("Error: " + err));
};

