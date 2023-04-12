const mongoose = require('mongoose');

let Session = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sessions', Session);