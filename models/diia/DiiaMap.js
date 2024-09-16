const mongoose = require('mongoose');

// List of countries for the dropdown (optional: can be generated dynamically)
const countries = ['US', 'India', 'China', 'Canada', 'Australia', 'France', 'Bangladesh', 'Nepal', 'Germany','Russia','Japan','Thailand','Ukraine']; // Add more as needed

const DiiaMapSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Batch: {
        type: String,  // Could be a string like '2020', '2021', etc.
    },
    Department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai'],
    },
    country: {
        type: String,
        enum: countries,  // Dropdown with country name or code
        required: true,
    },
    color: {
        type: String,  // Hex code or color name
        required: true,
    },
    type: {
        type: String,
        enum: ['Student', 'Research', 'Alumni'],  // Dropdown for types
        required: true,
    },
    maptext: {
        type: String,  // Text shown on the map
    },
    show: {
        type: Boolean,
        default: true,
    },
    link: {
        type: String,  // Optional link
    },
    disable: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaMap", DiiaMapSchema);
