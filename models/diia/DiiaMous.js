const mongoose = require('mongoose');

const DiiaMousSchema = new mongoose.Schema({
    Image: {
        type: String, // URL of the image
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String, // Type of MoU
        enum: ['Indian Institutions', 'International Institutions', 'Industry'],
    },
    startingDate: {
        type: Date,
    },
    endingDate: {
        type: Date,
    },
    description: {
        type: String,
        required: true
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
