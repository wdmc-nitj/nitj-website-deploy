const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
    email: { type: String, required: true },  // Ensure email is passed during creation
    password: { type: String, required: true },  // Password is required
    role: { 
        type: String, 
        enum: ['admin', 'restricted', 'diia'], 
        required: true  // Role is also required
    },
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf', 'cee', 'cai']
    }
}, { timestamps: true });

Schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);  // Hashing the password
  }
  next();
});

// Decrypt or compare function
Schema.methods.decryptPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare hashed password
};

module.exports = mongoose.model('AdminBroUser', Schema);
