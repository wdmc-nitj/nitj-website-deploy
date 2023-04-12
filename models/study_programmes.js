const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    programmeName:{
        type: String,
        unique: true,
    },
    show:{
        type: Boolean,
        default: true,
    },
    programmes:[
        {
            years: Number,
            list: [
                {
                    title: String,
                    url: String,
                }
            ]
        }
    ]
})

module.exports = mongoose.model('StudyProg', Schema);