const mongoose = require('mongoose');

const DiiaRankingsSchema = new mongoose.Schema({
    Rank: {
        type: String,
    },
    Image: {
        type: String, // Assuming the image URL will be stored as a string
    },
    title1: {
        type: String,
    },
    title2: {
        type: String,
    },
    description: {
        type: String,
    },
    show: {
        type: Boolean,
        default: true,
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
