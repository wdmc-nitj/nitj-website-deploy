const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates, fields } = require('../../utils');
const Schema = mongoose.Schema;

const updateSchema = new Schema(Object.assign({
    title: {
        type: String,
        required: true,
        notEmpty: true
    },
}, fields.admissionsFields, fields.webURL, fields.newGIF, commonFieldsForAll), { timestamps: true });

updateSchema.pre(regexForUpdateLogs, logUpdates);

const update = mongoose.model('admissionUpdate', updateSchema);

module.exports = update;