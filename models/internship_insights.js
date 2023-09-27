const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        stipend: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

//Model---------------------------->
const Model = mongoose.model("internship_insights", Schema);

//Export----------------------------->
module.exports = Model;

