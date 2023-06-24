const mongoose = require('mongoose');
const { commonFieldsForAll, regexForUpdateLogs, logUpdates, fields } = require('../utils');
const Schema = mongoose.Schema;

const categoryList = ['faculty', 'nonFaculty', 'facultyContract', 'nonFacultyContract', 'research'];

const recruitmentUpdateSchema = new Schema(Object.assign({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: categoryList
    },
}, fields.webURL, fields.newGIF, commonFieldsForAll), { timestamps: true });

const defaultJobsTab = new Schema({
    defaultTabName: {
        type: String,
        required: true,
        unique: true,
        enum: categoryList
    }
}, { timestamps: true });

recruitmentUpdateSchema.pre(regexForUpdateLogs, logUpdates);
defaultJobsTab.pre(regexForUpdateLogs, logUpdates);

const RecruitmentUpdate = mongoose.model('RecruitmentUpdate', recruitmentUpdateSchema);
const DefaultJobsTab = mongoose.model('DefaultJobsTab', defaultJobsTab);

module.exports = {
    RecruitmentUpdate,
    DefaultJobsTab,
};