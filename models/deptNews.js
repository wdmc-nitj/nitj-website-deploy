const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const DeptNewsSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    order: {
      type: Number,
      default: 0,
    },
    new: {
      type: Boolean,
      default: true,
    },
    pdfLink: {
      type: String,
    },
    sourceOfInfo: {
      type:  String
  },
    show: { type: Boolean, default: true },
    updateLogs: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//pre update hook for updateLogs---------------->

//Model---------------------------->
const Model = mongoose.model("deptNews", DeptNewsSchema);

//Export----------------------------->
module.exports = Model;
