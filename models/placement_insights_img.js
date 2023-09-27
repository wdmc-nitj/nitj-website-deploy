const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        link: {
            type: String,
            required: true,
        },
        category: {
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
const Model = mongoose.model("placement_stats_link", Schema);

//Export----------------------------->
module.exports = Model;

