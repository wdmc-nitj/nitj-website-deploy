const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    department: {
      type: String,
      enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    company: {
      type: String,
    },
    package: {
      type: Number,
    },
    sourceOfInfo: {
      type:  String
  },
    show: { type: Boolean, default: true },
    order: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", Schema);
