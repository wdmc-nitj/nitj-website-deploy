const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates } = require('../../utils');
const Schema = mongoose.Schema;

const ConsultancySchema = new Schema(Object.assign({
    facultyName: {
        type: String,
        required: true
    },
    clientOrg: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amountDigits: {
        type: Number,
        required: true
    },
    amountWords: {
        type: String,
        required: true
    },
    startYear: {
        type: Number,
        required: true
    },
}, commonFieldsForAll), { timestamps: true });

ConsultancySchema.pre(regexForUpdateLogs, logUpdates);

const Consultancy = mongoose.model('Consultancy', ConsultancySchema);

module.exports = Consultancy;