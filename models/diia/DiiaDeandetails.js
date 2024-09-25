const mongoose = require('mongoose');

const ContactDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Name of the dean or associate dean
    },
    designation: {
        type: String,
        enum: ["Dean","Associate Dean"], // e.g., Dean, Associate Dean
        required: true,
    },
    deptDesignation: {
        type: String,  // Department-specific designation (e.g., Dean of Engineering)
        required: true,
    },
    profileLink: {
        type: String,  // URL to the person's profile or webpage
    },
    email: {
        type: String,  // Contact email
        required: true,
    },
    phone: {
        type: String,  // Contact phone number
    },
    message: {
        type: String,  // A short message or quote from the person
    },
    fax: {
        type: String,  // Fax number
    },
    disable: {
        type: Boolean,  // Whether this contact should be displayed on the site
        default: false,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("ContactDetails", ContactDetailsSchema);
