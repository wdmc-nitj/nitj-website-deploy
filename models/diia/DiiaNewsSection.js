const mongoose = require('mongoose');

const DiiaNewsSectionSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
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
    link: {
        type: String, // URL for the link
    },
    show: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 1,
    },
    order: {
        type: Number,
    },
    ListInSummary: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 0,
    },
    disable: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("DiiaNewsSection", DiiaNewsSectionSchema);
