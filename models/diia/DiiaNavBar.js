const mongoose = require('mongoose');

const DiiaNavbarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // The text displayed for the navbar item
    },
    link: {
        type: String,  // URL to which the item links
        required: true,
    },
    order: {
        type: Number,  // Used to sort the navbar items
        default: 0,
    },
    submenus: [
        {
            title: {
                type: String,
                required: true,  // Title for the submenu item
            },
            link: {
                type: String,
                required: true,  // URL for the submenu item
            },
            order: {
                type: Number,  // Order for submenu items
                default: 0,
            },
        }
    ],
    show: {
        type: Boolean,  // Whether the item should be shown
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("DiiaNavBar", DiiaNavbarSchema);
