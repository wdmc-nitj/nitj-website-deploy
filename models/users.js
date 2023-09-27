const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

//Model---------------------------->
const Model = mongoose.model("users", Schema);

//Export----------------------------->
module.exports = Model;
