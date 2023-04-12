const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  department: {
    type: String,
    enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
  },
  achievement: [{
    title: {
      type: String,
      enum: ['Publications', 'Patents', 'Citations', 'Faculty', 'Placements', 'Highest Package']
    },
    count: { type: String },
  }],
  is_active: {
    type: Boolean,
    default: true
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
  order: {
    type: Number,
  }
}, { timestamps: true })

module.exports = mongoose.model("Achievement", Schema);