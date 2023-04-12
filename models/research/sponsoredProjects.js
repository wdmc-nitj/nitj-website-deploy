const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates } = require('../../utils');
const Schema = mongoose.Schema;

const SponsoredProjectSchema = new Schema(Object.assign({
    title: {
        type: String,
        required: true
    },
    yearOfSanctionStart: {
        type: Number,
        required: true
    },
    fundingAgency: {
        type: String,
        required: true
    },
    amountInLakhs: {
        type: Number,
        required: true
    },
}, commonFieldsForAll), { timestamps: true });

SponsoredProjectSchema.pre(regexForUpdateLogs, logUpdates);

const SponsoredProject = mongoose.model('SponsoredProject', SponsoredProjectSchema);

module.exports = SponsoredProject;