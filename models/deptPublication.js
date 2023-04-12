const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const PublicationSchema = new mongoose.Schema(
  {

    "DOCUMENT TITLE": {
      type: String
    },
    "AUTHORS": {
      type: String
    },
    "YEAR": {
      type: String
    },
    "SOURCE": {
      type: String
    },
    "STATUS": {
      type: String
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
const Model = mongoose.model("deptPublication", PublicationSchema);

//Export----------------------------->
module.exports = Model;

// object: {'Name of the Publication authority':value,'Publication Value':value}.
// proceed same s about us
