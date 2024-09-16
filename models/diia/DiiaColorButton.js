const mongoose = require('mongoose');

const DiiaColorButtonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Button name is mandatory
    },
    link: {
        type: String,  // URL associated with the button
        required: true,
    },
    order: {
        type: Number,  // Determines the display order of the button
    },
    color: {
        type: String,  // Color picker value (stores a hex color code)
        required: true,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaColorButton", DiiaColorButtonSchema);
