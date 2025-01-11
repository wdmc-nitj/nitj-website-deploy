const { User, Experience, OtpModel } = require('../models/samp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/reset_password_mailer');

// Middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const jwtToken = token.replace('Bearer ', '').trim();
    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Validators
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
};

const validateRegister = (req, res, next) => {
  const {  name, email, password, role, rollNo ,branch,year } = req.body;
  if (!name || !email || !password || !role || !rollNo || !branch || !year ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

const checkUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Main Controllers
const home = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the API' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
  
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};



const register = async (req, res) => {
  try {
    const { name, email, password, role, rollNo ,branch,year } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = new User({
      name,
      email,
      role,
      rollNo,
      branch,
      year,
      password: hashedPassword
    });

    await user.save();
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' ,error });
  }
};

// User Controllers
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      role,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ 
      message: 'User created successfully',
      user: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const updates = { username, email, role };
    
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Experience Controllers
const getAllExp = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experiences' });
  }
};

const addExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json({ 
      message: 'Experience added successfully',
      experience 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add experience' });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({
      message: 'Experience updated successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update experience' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience' });
  }
};

// OTP Controllers
const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await OtpModel.create({ email, otp });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate OTP' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpRecord = await OtpModel.findOne({ email, otp });
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await OtpModel.deleteOne({ _id: otpRecord._id });
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

// Password Reset Controller
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

module.exports = {
  // Middleware
  authenticate,
  isAdmin,
  // Validators
  validateLogin,
  validateRegister,
  checkUser,
  // Main Controllers
  home,
  login,
  register,
  // User Controllers
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  // Experience Controllers
  getAllExp,
  addExperience,
  updateExperience,
  deleteExperience,
  // OTP Controllers
  generateOtp,
  verifyOtp,
  // Password Reset
  resetPassword
};
