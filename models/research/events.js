const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates } = require('../../utils');
const Schema = mongoose.Schema;

const eventSchema = new Schema(Object.assign({
    title: {   // title of event
        type: String,
        required: true
    },
    dateTime: {   // date and time of event
        type: Date,
        required: true
    },
    venue: {   // venue of event
        type: String,
        required: true
    },
    organiser: {   // organiser of event
        type: String,
        required: true
    },
    category: {     // category of Events
        type: String,
        required: true,
        enum: ['conference', 'seminar', 'stc_fdp', 'workshop']
    },
}, commonFieldsForAll), { timestamps: true });

eventSchema.pre(regexForUpdateLogs, logUpdates);

const event = mongoose.model('event', eventSchema);

module.exports = event;