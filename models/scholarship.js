const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
   title: { type: String, required: true },
    desc: { type: String, default: "" },
    show: { type: Boolean, default: true },
    type: {
      type: String,
      enum: [
        "Academics",
        "Admissions",
        "others",
      ],
    },
    order: {
      type: Number,
      default: 0,
    },
    sourceOfInfoName: {
      type: String,
    },
    sourceOfInfoEmail: {
      type: String,
    },
    sourceOfInfoDesignation: {
      type: String,
    },
    sourceOfInfoDepartment: {
      type: String,
    },
    pdfLink: {
      type: String,
    },
    newPage: {
      type: Boolean,
    },
    new: {
      type: Boolean,
      default: true,
    },

    image: { type: String, default: "" },
    updateLogs: {
      type: Array,
      default: [],
    },
    showviewall:{type:Boolean,default:true},
  },
  {
    timestamps: true,
  })

module.exports=mongoose.model("Scholarship",Schema);
