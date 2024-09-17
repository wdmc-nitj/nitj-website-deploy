const mongoose = require('mongoose');

const DiiaNumberSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Title is mandatory
    },
    Number: {
        type: String,
        required: true,  // Number is mandatory
    },
    order: {
        type: Number,  // Determines the display order
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaNumber", DiiaNumberSchema);
