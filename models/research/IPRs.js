const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates } = require('../../utils');
const Schema = mongoose.Schema;

const IPRSchema = new Schema(Object.assign({
    iprTitle: {  
        type: String,
        required: true,
        notEmpty: true
    },
    iprCategory: {  
        type: String,
        required: true,
        notEmpty: true,
        enum: ['Patent', 'Design', 'Copyright', 'Computer Software']
    },
    iprNumber: {     
        type: String,
        required: true,
        notEmpty: true,
    },
    grantStatus: {     
        type: Boolean,
        default: false,
        required: true,
    },
    grantYear: {     
        type: Number,
        required: false
    },
    inventorList: {  
        type: [String],
        required: true,
        notEmpty: true
    },
}, commonFieldsForAll), { timestamps: true });

IPRSchema.pre(regexForUpdateLogs, logUpdates);

const IPR = mongoose.model('IPR', IPRSchema);

module.exports = IPR;
