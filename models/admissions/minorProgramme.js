const mongoose = require("mongoose");
const {commonFieldsForAll, regexForUpdateLogs, logUpdates} = require("../../utils.js");


const minorProgrammeSchema = new mongoose.Schema({
    nameOfProgramme: {
        type: String,
        required: true
    },
    availableProgrammes: {
        type: [{
            type: String,
            enum: {
                values: ["BT", "CH", "CE", "CS", "DS", "EC", "EE", "IC", "IP", "IT", "ME", "TT"],
                message: "Enter valid department code from [BT, CH, CE, CS, DS, EC, EE, IC, IP, IT, ME,TT]"
            }
        }],
        required: true
    },
    ...commonFieldsForAll
}, {timestamps:true});

minorProgrammeSchema.pre(regexForUpdateLogs, logUpdates);

const minorProgramme = mongoose.model("MinorProgramme",minorProgrammeSchema);

module.exports=minorProgramme;