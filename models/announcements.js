const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: "",
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
const Model = mongoose.model("announcements", Schema);

//Export----------------------------->
module.exports = Model;

