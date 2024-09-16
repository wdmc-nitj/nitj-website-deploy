const mongoose = require('mongoose');

const DiiaFooterSchema = new mongoose.Schema({
    QuickLinkName: {
        type: [String],  // An array of strings for link names
        required: true,
    },
    QuickLink: {
        type: [String],  // An array of strings for link URLs
        required: true,
    },
    order: {
        type: [Number],  // Determines the display order of the footer links
        required: true,
    },
    Col: {
        type: Number,  // Specifies the column number
        required: true,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaFooter", DiiaFooterSchema);
