const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { commonFieldsForAll, regexForUpdateLogs, logUpdates, fields } = require('../../utils');

const linkSchema = new Schema(Object.assign({
    title: {
        type: String,
        required: true,
        notEmpty: true
    },
}, fields.admissionsFields, fields.webURL, commonFieldsForAll), { timestamps: true });

linkSchema.pre(regexForUpdateLogs, logUpdates);

const link = mongoose.model('admissionLink', linkSchema);


module.exports = link;