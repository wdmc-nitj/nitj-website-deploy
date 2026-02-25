const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  department: {
    type: String,
    enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
  },
  title: { type: String, },
  desc: { type: String, },
  link: {
    type: String
  },
  order: {
    type: Number,
  },
  new: {
    type: Boolean,
  },
  sourceOfInfo: {
    type:  String
},
  show: { type: Boolean, default: true }

}, { timestamps: true })

module.exports = mongoose.model('Activity', Schema);