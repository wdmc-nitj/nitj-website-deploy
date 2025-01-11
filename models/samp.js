const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Experience Schema
const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }
},{ collection: 'samp-experiences' });

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // OTP expires after 5 minutes
  }
}, { collection: 'samp-otps' }); // Specify collection name

// User Schema
const userSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Mentor', 'Mentee'],
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { collection: 'samp-users' }); // Specify collection name

// JWT generation method
userSchema.methods.generateToken = async function() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      username: this.username, // Make sure this field exists if used
      isAdmin: this.isAdmin,
    }, process.env.JWT_KEY, { expiresIn: '10m' });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Models
const Experience = mongoose.model('Experience', experienceSchema);
const OtpModel = mongoose.model('Otp', otpSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Experience,
  OtpModel,
  User
};
