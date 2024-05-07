const mongoose = require('mongoose');

const deptWiseFaculty = mongoose.Schema({
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai'],
        unique: true
    },
    faculty: [
        {
            ID: {
                type: mongoose.Schema.ObjectId,
                ref: 'faculty_test'
            },
            order: Number,
            postion: String
        }
    ]
})

module.exports = mongoose.model('DeptWiseFaculty', deptWiseFaculty);
