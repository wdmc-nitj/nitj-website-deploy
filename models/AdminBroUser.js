const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted','diia'], required: true },
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    }
}, { timestamps: true })

module.exports = mongoose.model('AdminBroUser', Schema);