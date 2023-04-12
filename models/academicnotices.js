const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  ref_no: {
    type: String,
  },
  date: {
    type: String,
  },
  url: {
    type: String,
  },
  show: { type: Boolean, default: true },
});

module.exports = mongoose.model('AcadNotices', Schema);