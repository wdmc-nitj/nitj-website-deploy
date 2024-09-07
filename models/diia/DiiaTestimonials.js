const mongoose = require('mongoose');

const DiiaTestimonialsSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
    },
    name: {
        type: String,
    },
    batch: {
        type: String,
    },
    country: {
        type: String,
    },
    dept: {
        type: String,
    },
    degree: {
        type: String,
    },
    description: {
        type: String,
    },
    currentDesignation: {
        type: String,
    },
    videoLink: {
        type: String, // URL for the video
    },
    linkedIn: {
        type: String, // URL for LinkedIn profile
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

module.exports = mongoose.model("DiiaTestimonials", DiiaTestimonialsSchema);
