const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const ConsultancySchema = new mongoose.Schema(
    {

        "SR NO": {
            type: String
        },
        "NAME OF FACULTY (CHIEF CONSULTANT)": {
            type: String
        },
        "CLIENT ORGANIZATION": {
            type: String
        },
        "TITLE OF CONSULTANCY OF PROJECT": {
            type: String
        },
        "AMOUNT RECEIVED (IN RUPEES)": {
            type: String
        },
        "AMOUNT RECEIVED (IN WORDS)": {
            type: String
        },

        department: {
            type: String,
            enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
        },
        show: { type: Boolean, default: true },
        order: {
            type: Number,
        },
        sourceOfInfo: {
            type:  String
        },
    }, {
    timestamps: true,
}
);

//Model---------------------------->
const Model = mongoose.model("deptConsultancy", ConsultancySchema);

//Export----------------------------->
module.exports = Model;