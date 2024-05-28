const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates } = require('../../utils');
const Schema = mongoose.Schema;

const MoUSchema = new Schema(Object.assign({
    orgName: {  // name of the organization
        type: String,
        required: true,
        notEmpty: true
    },
    dateOfMoU: {     // date of MoU
        type: String,
        required: true,
        notEmpty: true,
        validate: {
            // dd-mm-yyyy
            validator: function (v) {
                const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
                return dateRegex.test(v);
            },
            message: props => `${props.value} is not a valid date! Please enter in dd-mm-yyyy format.`
        }
    },
    validity: {    // validity of MoU
        type: String,
        required: true,
        notEmpty: true
    },
    category: {     // category of MoU
        type: String,
        required: true,
        notEmpty: true,
        enum: ['industries', 'indian_institutes', 'international_institutes']
    },
}, commonFieldsForAll), { timestamps: true });

MoUSchema.pre(regexForUpdateLogs, logUpdates);

const MoU = mongoose.model('MoU', MoUSchema);

module.exports = MoU;
