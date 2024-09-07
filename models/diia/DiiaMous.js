const mongoose = require('mongoose');

const DiiaMousSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
    },
    name: {
        type: String,
    },
    type: {
        type: String, // Type of MoU
        enum: ['national', 'international', 'industries', 'others'],
    },
    startingDate: {
        type: Date,
    },
    endingDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    Poc: {
        type: String, // Point of contact
    },
    Link: {
        type: String, // URL link
    },
    ExtLink: {
        type: String, // URL for the external link
    },
    showInSlider: {
        type: Boolean,
        default: true,
    },
    sliderOrder: {
        type: Number,
    },
    showInSummary: {
        type: Boolean,
        default: false,
    },
    summaryOrder: {
        type: Number,
    },
    disable: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("DiiaMous", DiiaMousSchema);
