const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        department: {
            type: String,
        },
        designation: {
            type: String,
        },
        mobileno: {
            type: String,
        },
        email: {
            type: String,
        },
        link: {
            type: String,
            default: "https://www.iconpacks.net/icons/1/free-user-icon-244-thumb.png",
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
const Model = mongoose.model("people", Schema);

//Export----------------------------->
module.exports = Model;

