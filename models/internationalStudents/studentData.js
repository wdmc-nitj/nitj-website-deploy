const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    branch: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai'],
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    testimonial: {
        type: String
    }
});

module.exports = mongoose.model("internationalStudents", Schema);
