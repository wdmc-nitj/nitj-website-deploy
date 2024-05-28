const Mongoose = require('mongoose');

const Schema = new Mongoose.Schema({
    centrename: {
        type: String,
        required: true,
    },
    shortterm: {
        type: String,
        unique: true,
    },
    show:{
        type: Boolean,
        default: true,
    },
    faculties: [
        {
            name: String,
            designation: String,
            department: String,
            email_id: String,
            qualification: String,
            url: String
        }
    ],
    associate_faculties: [
        {
            name: String,
            designation: String,
            department: String,
            email_id: String,
            qualification: String,
            url: String
        }
    ],
    workers: [
        {
            name: String,
            designation: String,
            qualification: String,
            shopname: String,
        }
    ],
    specialLinks:[
        {
            title: String,
            url: String
        }
    ],
}, {
    timestamps: true,
});

module.exports = Mongoose.model('SpecialCentres', Schema)