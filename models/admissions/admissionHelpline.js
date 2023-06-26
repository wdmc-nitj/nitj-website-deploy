const mongoose = require('mongoose');
const { commonFieldsForAll, logUpdates, regexForUpdateLogs, fields } = require('../../utils');
const Schema = mongoose.Schema;

const helplineSchema = new Schema(Object.assign({
    ...fields.admissionsFields,
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator : email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email),
            message: "Please fill a valid email address"
        } 
    },
    contactNumbers: {
        type: [{
            type: String,
            required: true
        }],
        required: true,
        validate: {
            validator: function (v) {
                return v.length;
            },
            message: () => "Enter atleast one number!"
        }
    },
    languages: {
        type: [String], 
        // validates as an array of strings
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.every((item) => typeof item === 'string' && item.length > 0);
            },
            message: props => `${props.value} is not a valid array of strings!`
        }
    },
    timings: {
        type: [{
            type: String,
            required: true
        }],
    }
    // startTime: {
    //     // 12 hour format
    //     type: String,
    //     notEmpty: true,
    //     validate: {
    //         validator: function (v) {
    //             return /\d{2}:\d{2} [AP]M/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid time. Please enter the time in HH:MM (AM/PM) format like 01:00 PM, 09:00 AM !`
    //     }
    // },
    // endTime: {
    //     // 12 hour format
    //     type: String,
    //     notEmpty: true,
    //     validate: {
    //         validator: function (v) {
    //             return /\d{2}:\d{2} [AP]M/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid time! Please enter the time in HH:MM (AM/PM) format like 01:00 PM, 09:00 AM !`
    //     }
    // }
}, commonFieldsForAll), { timestamps: true });

helplineSchema.pre(regexForUpdateLogs, logUpdates);

const helpline = mongoose.model('admissionHelpline', helplineSchema);

module.exports = helpline;