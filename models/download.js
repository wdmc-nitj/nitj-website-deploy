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
        category: {
            type: String,
             
        }
    },
    {
        timestamps: true,
    }
);

//Model---------------------------->
const Model = mongoose.model("download", Schema);

//Export----------------------------->
module.exports = Model;

