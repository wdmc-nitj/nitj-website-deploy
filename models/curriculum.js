const Mongoose = require('mongoose');

const Schema = new Mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    show:{
        type: Boolean,
        default: true,
    },
    links:
        {
            after2022: String,
            after2018: String
        }
}, {
    timestamps: true,
});

module.exports = Mongoose.model('Curriculum', Schema);