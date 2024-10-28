const mongoose = require('mongoose');

const DiiaTilesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Title of the tile
    },
    shortdes: {
        type: String,  // Short description for the tile
        required: true,
    },
    des: {
        type: String,  // Detailed description for the tile
        required: true,
    },
    image: {
        type: String,  // URL of the image for the tile
        required: true,
    },
    order: {
        type: Number,  // Order of appearance for the tile
        default: 0,
    },
    show: {
        type: Boolean,  // Whether to display this tile
        default: false,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaTiles", DiiaTilesSchema);
