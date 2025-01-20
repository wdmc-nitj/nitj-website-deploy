const mongoose = require('mongoose');

const DiiaNewsSectionSchema = new mongoose.Schema({
    title1: {
        type: String,
        required: true,
    },
    title2: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
    },
    disable: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("DiiaNewsSection", DiiaNewsSectionSchema);
