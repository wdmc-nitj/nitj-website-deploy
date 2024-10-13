const mongoose = require('mongoose');

const DiiagallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // The title of the gallery item
    },
    category: {
        type: String,  // Category (e.g., event, project)
        required: true,
    },
    url: {
        type: String,  // URL of the image or video
        required: true,
    },
    showInslider: {
        type: Boolean,  // Whether to show this item in the slider
        default: false,
    },
    showIngallery: {
        type: Boolean,  // Whether to show this item in the gallery
        default: false,
    },
}, { timestamps: true }); 

module.exports = mongoose.model("Diiagallery", DiiagallerySchema);
