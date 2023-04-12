const mongoose = require('mongoose');

const ResetPassword = new mongoose.Schema({
    user_id: {
        type: String,
    },
    token_id: {
        type: String,
    },
    isValid: {
        type: Boolean,
        require: true,
        default: true
    },
    createdOn: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResetPassword', ResetPassword);