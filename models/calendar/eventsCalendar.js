const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phoneNumber: {
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
    regLink: {
        type: String,
        match: /^https?:\/\/.+$/, 
    },
    pdfLink: {
        type: String,
        match: /^https?:\/\/.+$/, 
    },
    description: {
        type: String,
    },
    multiDayEvent: {
        type: Boolean
    },
    studentCoordinator: {
        coordinator1: {
            type: coordinatorSchema,
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
        default: false,
        required: true
    },
    onSpotReg: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;