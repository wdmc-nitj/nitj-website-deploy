const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        department: {
            type: String,
        },
        name: {
            type: String,
        },
        activity: {
            type: String,
            default: ""
        },
        given_By: {
            type: String,
            default: ""
        },
        year:{
            type: Number,
        },
        sourceOfInfo: {
            type: Object,
            default: {
              name: null,
              email: null,
              designation: null,
              department: null,
            }
          },
        show: { type: Boolean, default: true },
        order:{
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

//Model---------------------------->
const Model = mongoose.model("awardsAndHonors", Schema);

//Export----------------------------->
module.exports = Model;

