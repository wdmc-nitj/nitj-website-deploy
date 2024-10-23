const mongoose = require('mongoose');

const DiiaHeroSliderSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
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
        required: true
    },
    link: {
        type: String, // URL for the link
    },
    show: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
    },
    disable: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("DiiaHeroSlider", DiiaHeroSliderSchema);
