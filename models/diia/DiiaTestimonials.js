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
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
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
        type: Boolean,
        default: true,
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
    }
}, { timestamps: true });

module.exports = mongoose.model("DiiaTestimonials", DiiaTestimonialsSchema);
