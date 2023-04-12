const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    Email: { type: String },
    Phone: { type: String },
    Address: { type: String },
    FacebookUrl: { type: String },
    InstagramUrl: { type: String },
    TwitterUrl: { type: String },
    LinkedinUrl: { type: String },

    sourceOfInfo: {
        type:  String
    },
}, { timestamps: true })

module.exports = mongoose.model("deptContactUs", Schema);