const mongoose = require('mongoose');

const DiiaRankingsSchema = new mongoose.Schema({
    Rank: {
        type: String,
        required: true,
    },
    Image: {
        type: String, // Assuming the image URL will be stored as a string
        required: true
    },
    title1: {
        type: String,
        required: true,
    },
    title2: {
        type: String,
    },
    description: {
        type: String,
    },
    show: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
    },
    disable: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("DiiaRankings", DiiaRankingsSchema);
