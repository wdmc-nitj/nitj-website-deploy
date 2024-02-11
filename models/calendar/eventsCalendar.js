const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    name: {
        type: String,
    },
});

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required:true
    },
    organisingDept: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['academic', 'club', 'sports', 'placement','STC/FDP','holiday','conference','fest'],
        required: true
    },
    type: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    meetlink: {
        type: String,
        match: /^https?:\/\/.+$/,
    },
    description: {
        type: String,
        required: true
    },
    studentCoordinator: {
        coordinator1: {
            type: coordinatorSchema,
            required: true,
        },
        coordinator2: coordinatorSchema,
    },
    facultyCoordinator: {
        name: { type: String },
        email: { type: String },
    },
    socialMediaLinks: {
        whatsapp: { type: String },
        instagram: { type: String },
        twitter: { type: String },
    },
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf', 'cee', 'cai']
    },
    show: {
        type: Boolean
    },
    sourceOfInfo: {
        type: String
    },
    posterUrl: {
        type: String
    },
    openToAnyone: {
        type: Boolean,
        default: false
    },
    regReq: {
        type: Boolean,
        default: false
    },
    onSpotReg: {
        type: Boolean,
        default: false
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;