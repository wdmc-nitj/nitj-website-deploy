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
    showInSlider: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 1,
    },
    sliderOrder: {
        type: Number,
    },
    showInSummary: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 0,
    },
    summaryOrder: {
        type: Number,
    },
    disable: {
        type: Number, // 0/1 value
        enum: [0, 1],
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("DiiaMous", DiiaMousSchema);
