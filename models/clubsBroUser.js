const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['clubadmin'], required: true },
    // role: { type: String, enum: ['admin', 'restricted','clubadmin'], required: true },
    department: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('ClubsBroUser', Schema);