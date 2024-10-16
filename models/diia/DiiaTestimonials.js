const mongoose = require('mongoose');

const DiiaTestimonialsSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
        required: true
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
        enum: [
            "Bio Technology",
            "Chemical Engineering",
            "Civil Engineering",
            "Computer Science and Engineering",
            "Data Science and Engineering",
            "Electrical Engineering",
            "Electronics and Communication Engineering",
            "Electronics and VLSI Engineering",
            "Industrial and Production Engineering",
            "Information Technology",
            "Instrumental and Control Engineering",
            "Mathematics and Computing",
            "Mechanical Engineering",
            "Textile Technology"
          ]
    },
    degree: {
        type: String,
    },
    description: {
        type: String,
        required: true
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
        default: false,
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
