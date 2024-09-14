const mongoose = require('mongoose');

const DiiaHeroSliderSchema = new mongoose.Schema({
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
        type: Boolean,
        default: true,
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
