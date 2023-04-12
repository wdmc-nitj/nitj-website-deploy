const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    show: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AcademicCalendar', Schema);