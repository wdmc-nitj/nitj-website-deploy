const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        question: {
            type: String,
        },
        answer: {
            type: String,
        },
        related: {
            type: String,
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
const Model = mongoose.model("faqs", Schema);

//Export----------------------------->
module.exports = Model;

