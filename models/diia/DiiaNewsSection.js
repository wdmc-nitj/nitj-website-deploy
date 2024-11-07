const mongoose = require('mongoose');

const DiiaNewsSectionSchema = new mongoose.Schema({
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
    link: {
        type: String, // URL for the link
    },
    ExtLink: {
        type: String, // URL for the external link
    },
    show: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
    },
    ListInSummary: {
        type: Boolean,
        default: false,
    },
    disable: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("DiiaNewsSection", DiiaNewsSectionSchema);
