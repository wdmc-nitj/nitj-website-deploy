const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const ProjectSchema = new mongoose.Schema(
  {

    "SR NO": {
      type: String
    },
    "PROJECT TITLE": {
      type: String
    },
    "YEAR OF SANCTION": {
      type: String
    },
    "FUNDING AGENCY": {
      type: String
    },
    "SANCTION AMOUNT RS IN LAC": {
      type: String
    },
    Link:{
      type:String
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
const Model = mongoose.model("deptProjects", ProjectSchema);

//Export----------------------------->
module.exports = Model;

