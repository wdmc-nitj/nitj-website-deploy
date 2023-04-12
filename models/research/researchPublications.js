const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates, fields } = require('../../utils');
const Schema = mongoose.Schema;


const stringValidator = {
    // validate string
    validator: function (v) {
        return v && v.trim().length > 0;
    },
    message: props => `${props.value} is not a valid string! Please enter a valid string.`
};

const citedResearchSchema = new Schema(Object.assign({
    document: {     // pair of document name and link to document
        type: Object.assign({
            name: {
                type: String,
                required: true,
                notEmpty: true,
                validate: stringValidator
            },
        }, fields.webURL),
        required: true,
        notEmpty: true,
    },
    authors: {  // authors of the research
        // pair of author name and link to author's profile
        type: [Object.assign({
            name: {
                type: String,
                required: true,
                notEmpty: true,
                validate: stringValidator
            },
        }, fields.webURL)],
        required: true,
        notEmpty: true
    },
    year: {     // year of publication
        type: Number,
        required: true,
        notEmpty: true,
        validate: {
            validator: function (v) {
                return v >= 1900 && v <= 2100;
            },
            message: props => `${props.value} is not a valid year! Please enter a year between 1900 and 2100.`
        }
    },
    source: {   // source of the research
        // pair of source name and link to source
        type: Object.assign({
            name: {
                type: String,
                required: true,
                notEmpty: true,
                validate: stringValidator
            },
        }, fields.webURL),
        required: true,
        notEmpty: true
    },
    cites: { // number of citations
        // pair of number of citations and link to citations
        type: Object.assign({
            number: {
                type: Number,
                required: true,
                notEmpty: true,
                validate: {
                    validator: function (v) {
                        // parse number of citations
                        v = parseInt(v);
                        return v >= 0;
                    },
                    message: props => `${props.value} is not a valid number of citations! Please enter a positive number.`
                }
            },
        }, fields.webURL),
        required: true,
        notEmpty: true
    },
}, commonFieldsForAll), { timestamps: true });

const refereedResearchSchema = new Schema(Object.assign({
    description: {  // description of the research
        type: String,
        required: true,
        notEmpty: true,
        validate: stringValidator
    },
}, fields.webURL, commonFieldsForAll), { timestamps: true });

citedResearchSchema.pre(regexForUpdateLogs, logUpdates);
refereedResearchSchema.pre(regexForUpdateLogs, logUpdates);

const CitedResearch = mongoose.model('CitedResearch', citedResearchSchema);
const RefereedResearch = mongoose.model('RefereedResearch', refereedResearchSchema);


module.exports = {
    CitedResearch,
    RefereedResearch
};